import { Suspense } from "react";
import type { ClassKey } from "keycloakify/account";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/account/DefaultPage";
import Template from "./Template";
import { OidcProvider } from "./oidc";
import "../index.css";
import Account from "./pages/Account";
import Password from "./pages/Password";
import Applications from "./pages/Applications";
import FederatedIdentity from "./pages/FederatedIdentity";
import Log from "./pages/Log";
import Sessions from "./pages/Sessions";
import Totp from "./pages/Totp";
import { ThemeProvider } from "next-themes";

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <OidcProvider>
            <ContextualizedKcPage {...props} />
        </OidcProvider>
    );
}

function ContextualizedKcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const kcContextWithChinese = {
        ...kcContext,
        locale: {
            ...kcContext.locale,
            currentLanguageTag: "zh-CN",
            supported: kcContext.locale?.supported ?? []
        }
    };

    const { i18n } = useI18n({ kcContext: kcContextWithChinese });

    // 全局默认 classes
    const classes = {} satisfies { [key in ClassKey]?: string };

    if (!kcContext) {
        return <div className="p-4 text-sm text-muted-foreground">No kcContext provided</div>;
    }

    return (
        <ThemeProvider attribute="class">
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "account.ftl":
                            return (
                                <Account
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "password.ftl":
                            return (
                                <Password
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "applications.ftl":
                            return (
                                <Applications
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "federatedIdentity.ftl":
                            return (
                                <FederatedIdentity
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "log.ftl":
                            return (
                                <Log
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "sessions.ftl":
                            return (
                                <Sessions
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "totp.ftl":
                            return (
                                <Totp
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContextWithChinese}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}
