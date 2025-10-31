import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

const publicUrl = undefined;
const isAuthGloballyRequired = false;

const isDev = import.meta.env.DEV;

const getRealm = () => {
    if (isDev) {
        return "";
    }

    const [, afterRealms] = window.location.pathname.split("/realms/");
    return afterRealms?.split("/")[0] ?? "";
};

const computeHomeUrl = (realm: string) => {
    if (publicUrl !== undefined) {
        return publicUrl;
    }

    if (isDev) {
        return import.meta.env.BASE_URL;
    }

    const [beforeRealms] = window.location.pathname.split("/realms/");
    const kcHttpRelativePath = beforeRealms ?? "";

    const sanitizedPrefix =
        kcHttpRelativePath === "" || kcHttpRelativePath === "/"
            ? ""
            : kcHttpRelativePath.endsWith("/")
            ? kcHttpRelativePath.slice(0, -1)
            : kcHttpRelativePath;

    return `${sanitizedPrefix}/realms/${realm}/account/`;
};

export const realm = getRealm();

const homeUrl = computeHomeUrl(realm);

export const { OidcProvider, useOidc, getOidc } = isDev
    ? createMockReactOidc({
          isUserInitiallyLoggedIn: true,
          homeUrl,
          autoLogin: isAuthGloballyRequired
      })
    : createReactOidc(async () => {
          return {
              issuerUri: `${window.location.origin}/realms/${realm}`,
              clientId: "account-console",
              homeUrl,
              autoLogin: isAuthGloballyRequired
          };
      });
