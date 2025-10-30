import type { Preview } from "@storybook/react";
import "../src/index.css";

// Extend window interface for Storybook mocks
declare global {
    interface Window {
        __STORYBOOK_MOCK_USER_PROFILE__?: unknown;
        __STORYBOOK_MOCK_I18N_MESSAGES__?: Record<string, string>;
    }
}

import type { Decorator } from '@storybook/react';

// Global decorator to provide mock data
const withMockData: Decorator = (Story, context) => {
    // Set mock data on window for hooks to use
    if (typeof window !== 'undefined') {
        (window as Window).__STORYBOOK_MOCK_USER_PROFILE__ = {
            id: "d93e1772-4916-4243-850f-a6d9b2615716",
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            email: "testuser@gmail.com",
            emailVerified: true,
            attributes: {
                favourite_pet: ["cat"],
                locale: ["en"]
            },
            userProfileMetadata: {
                attributes: [
                    {
                        name: "locale",
                        displayName: "locale",
                        required: false,
                        readOnly: false,
                        validators: {},
                        multivalued: false,
                        annotations: {}
                    },
                    {
                        name: "username",
                        displayName: "${username}",
                        required: true,
                        readOnly: true,
                        validators: {
                            multivalued: { max: "1" },
                            length: { max: 255, "ignore.empty.value": true, min: 3 }
                        },
                        multivalued: false,
                        annotations: {}
                    },
                    {
                        name: "email",
                        displayName: "${email}",
                        required: true,
                        readOnly: false,
                        validators: {
                            multivalued: { max: "1" },
                            length: { max: 255, "ignore.empty.value": true },
                            email: { "ignore.empty.value": true }
                        },
                        multivalued: false,
                        annotations: {}
                    },
                    {
                        name: "firstName",
                        displayName: "${firstName}",
                        required: true,
                        readOnly: false,
                        validators: {
                            multivalued: { max: "1" },
                            length: { max: 255, "ignore.empty.value": true }
                        },
                        multivalued: false,
                        annotations: {}
                    },
                    {
                        name: "lastName",
                        displayName: "${lastName}",
                        required: true,
                        readOnly: false,
                        validators: {
                            multivalued: { max: "1" },
                            length: { max: 255, "ignore.empty.value": true }
                        },
                        multivalued: false,
                        annotations: {}
                    },
                    {
                        name: "favourite_pet",
                        displayName: "${profile.attributes.favourite_pet}",
                        required: true,
                        readOnly: false,
                        annotations: {
                            inputType: "select",
                            inputOptionLabelsI18nPrefix: "profile.attributes.favourite_pet"
                        },
                        validators: {
                            multivalued: { max: "1" },
                            options: { options: ["cat", "dog", "bird"] }
                        },
                        multivalued: false
                    }
                ],
                groups: [
                    {
                        name: "user-metadata",
                        displayHeader: "User metadata",
                        displayDescription: "Attributes, which refer to user metadata"
                    }
                ]
            }
        };

        (window as Window).__STORYBOOK_MOCK_I18N_MESSAGES__ = {
            // Keep minimal mock data for Storybook compatibility
            username: "用户名",
            email: "邮箱",
            firstName: "名",
            lastName: "姓"
        };
    }

    return Story(context);
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    decorators: [withMockData]
};

export default preview;