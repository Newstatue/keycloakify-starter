import { useEffect, useState } from "react";
import {
    getUserProfile,
    getI18nMessages,
    type I18nMessages,
    type UserProfile
} from "./client";

declare global {
    interface Window {
        __STORYBOOK_MOCK_USER_PROFILE__?: UserProfile;
        __STORYBOOK_MOCK_I18N_MESSAGES__?: I18nMessages;
    }
}

export function useUserProfile() {
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);

    useEffect(() => {
        // Check for Storybook mock data first
        if (typeof window !== 'undefined' && window.__STORYBOOK_MOCK_USER_PROFILE__) {
            setUserProfile(window.__STORYBOOK_MOCK_USER_PROFILE__);
            return;
        }

        getUserProfile().then(setUserProfile);
    }, []);

    return { userProfile };
}

export function useI18nMessages() {
    const [i18nMessages, setI18nMessages] = useState<I18nMessages | undefined>(undefined);

    useEffect(() => {
        // Check for Storybook mock data first
        if (typeof window !== 'undefined' && window.__STORYBOOK_MOCK_I18N_MESSAGES__) {
            setI18nMessages(window.__STORYBOOK_MOCK_I18N_MESSAGES__);
            return;
        }

        getI18nMessages().then(setI18nMessages);
    }, []);

    return { i18nMessages };
}