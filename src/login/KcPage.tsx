import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import "../index.css";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Info from "./pages/Info";
import LoginPassword from "./pages/LoginPassword";
import LoginResetPassword from "./pages/LoginResetPassword";
import LoginUsername from "./pages/LoginUsername";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import { ThemeProvider } from "next-themes";

const UserProfileFormFields = lazy(
    () => import("./UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    // 确保默认使用中文
    const kcContextWithChinese = {
        ...kcContext,
        locale: {
            ...kcContext.locale,
            currentLanguageTag: "zh-CN",
            supported: kcContext.locale?.supported ?? []
        }
    };

    const { i18n } = useI18n({ kcContext: kcContextWithChinese });

    return (
        <ThemeProvider attribute="class">
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "error.ftl":
                            return (
                                <Error
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "info.ftl":
                            return (
                                <Info
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-password.ftl":
                            return (
                                <LoginPassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginResetPassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-username.ftl":
                            return (
                                <LoginUsername
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-verify-email.ftl":
                            return (
                                <LoginVerifyEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "register.ftl":
                            return (
                                <Register
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                        case "terms.ftl":
                            return (
                                <Terms
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        default:
                            // 其他页面保留默认样式
                            return (
                                <DefaultPage
                                    kcContext={kcContextWithChinese}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </Suspense>
        </ThemeProvider>
    );
}

// 全局默认 classes
const classes = {} satisfies { [key in ClassKey]?: string };
