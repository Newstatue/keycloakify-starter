import { getOidc } from "../oidc";
import { createKeycloakUtils } from "oidc-spa/keycloak";
import type { Attribute } from "keycloakify/login/KcContext/KcContext";

const authenticatedFetch = async (path: string, options?: RequestInit) => {
    const oidc = await getOidc();

    if (!oidc.isUserLoggedIn) {
        throw new Error("User is not logged in");
    }

    const { accessToken } = await oidc.getTokens();

    const {
        issuerUriParsed: { kcHttpRelativePath, realm }
    } = createKeycloakUtils({ issuerUri: oidc.params.issuerUri });

    const basePath = `${kcHttpRelativePath ?? ""}/realms/${realm}`;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return fetch(`${basePath}${normalizedPath}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            ...(options?.headers ?? {})
        }
    });
};

export type UserProfile = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    attributes: Record<string, string[]>;
    userProfileMetadata: {
        attributes: Attribute[];
        groups: {
            name: string;
            displayHeader: string;
            displayDescription: string;
        }[];
    };
};

const userProfileMock: UserProfile = {
    id: "test-user",
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    emailVerified: true,
    attributes: {
        locale: ["zh-CN"]
    },
    userProfileMetadata: {
        attributes: [],
        groups: []
    }
};

export async function getUserProfile(): Promise<UserProfile> {
    if (import.meta.env.DEV) {
        return userProfileMock;
    }

    const response = await authenticatedFetch("/account/?userProfileMetadata=true");
    return response.json();
}

export type I18nMessages = Record<string, string>;

export const i18nMessagesMock: I18nMessages = {
    username: "Username",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name"
};

export async function getI18nMessages(): Promise<I18nMessages> {
    if (import.meta.env.DEV) {
        return i18nMessagesMock;
    }

    const userProfile_preI18n = await getUserProfile();
    const languageTag = userProfile_preI18n.attributes.locale?.[0] ?? "zh-CN";

    const oidc = await getOidc();

    if (!oidc.isUserLoggedIn) {
        throw new Error("User is not logged in");
    }

    const {
        issuerUriParsed: { kcHttpRelativePath, realm }
    } = createKeycloakUtils({ issuerUri: oidc.params.issuerUri });

    const data: { key: string; value: string }[] = await fetch(
        `${kcHttpRelativePath ?? ""}/resources/${realm}/account/${languageTag}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    ).then(response => response.json());

    return Object.fromEntries(data.map(item => [item.key, item.value]));
}
