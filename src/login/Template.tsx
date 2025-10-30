import { useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
// import { getKcClsx } from "keycloakify/login/lib/kcClsx";
// import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    AlertTriangle,
    XCircle,
    Info
} from "lucide-react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        // bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        // classes,
        children
    } = props;

    // const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;
    // const { currentLanguage, enabledLanguages } = i18n; // 已注释，因为语言切换功能被禁用

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    // useSetClassName({
    //     qualifiedName: "html",
    //     className: kcClsx("kcHtmlClass")
    // });

    // useSetClassName({
    //     qualifiedName: "body",
    //     className: bodyClassName ?? kcClsx("kcBodyClass")
    // });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col relative">
            {realm.displayNameHtml && (
                <div id="kc-header" className="absolute top-4 left-4 z-10">
                    <h1 className="text-xl font-bold text-foreground">
                        {msg("loginTitleHtml", realm.displayNameHtml)}
                    </h1>
                </div>
            )}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md md:shadow-lg md:bg-card md:border md:rounded-lg">
                    <div className="md:p-6">
                        <header className="pb-4">
                            {(() => {
                                const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                    <h1 id="kc-page-title" className="text-xl font-semibold text-center">
                                        {headerNode}
                                    </h1>
                                ) : (
                                    <div id="kc-username" className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                                            <label id="kc-attempted-username" className="text-sm font-medium">
                                                {auth.attemptedUsername}
                                            </label>
                                            <a
                                                id="reset-login"
                                                href={url.loginRestartFlowUrl}
                                                aria-label={msgStr("restartLoginTooltip")}
                                                className="text-sm text-primary hover:underline flex items-center gap-2"
                                            >
                                                <span>{msg("restartLoginTooltip")}</span>
                                            </a>
                                        </div>
                                    </div>
                                );

                                if (displayRequiredFields) {
                                    return (
                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <span className="text-sm text-muted-foreground">
                                                    <span className="text-destructive">*</span>
                                                    {msg("requiredFields")}
                                                </span>
                                            </div>
                                            {node}
                                        </div>
                                    );
                                }

                                return node;
                            })()}
                        </header>
                        <div id="kc-content" className="pb-6 md:pb-0">
                            <div id="kc-content-wrapper" className="space-y-4">
                                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <Alert variant={message.type === "error" ? "destructive" : "default"}>
                                        {message.type === "success" && <CheckCircle className="h-4 w-4" />}
                                        {message.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                                        {message.type === "error" && <XCircle className="h-4 w-4" />}
                                        {message.type === "info" && <Info className="h-4 w-4" />}
                                        <AlertDescription
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(message.summary)
                                            }}
                                        />
                                    </Alert>
                                )}
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && (
                                    <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                        <div className="text-center">
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <Button
                                                variant="link"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                                    return false;
                                                }}
                                                className="p-0 h-auto font-normal"
                                            >
                                                {msg("doTryAnotherWay")}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                                {socialProvidersNode}
                                {displayInfo && (
                                    <div id="kc-info">
                                        <div id="kc-info-wrapper">
                                            {infoNode}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 隐藏的语言表单，确保 Keycloak 自动设置 locale=zh-CN */}
            <form id="kc-locale-form" action={url.loginAction} method="post" style={{ display: 'none' }}>
                <input type="hidden" name="user.attributes.locale" value="zh-CN" />
            </form>
        </div>
    );
}
