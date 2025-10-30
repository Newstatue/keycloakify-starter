import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPassword(props: PageProps<Extract<KcContext, { pageId: "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { realm, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const hasPasswordError = messagesPerField.existsError("password");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("doLogIn")}
            displayMessage={!messagesPerField.existsError("password")}
        >
            <div className="space-y-6">
                <form
                    id="kc-form-login"
                    className="space-y-5"
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                >
                    {/* 隐藏的语言表单，确保 Keycloak 自动设置 locale=zh-CN */}
                    <input type="hidden" name="user.attributes.locale" value="zh-CN" />

                    <div className="space-y-3">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                            {msg("password")}
                        </Label>
                        <PasswordWrapper i18n={i18n} passwordInputId="password">
                            <Input
                                tabIndex={2}
                                id="password"
                                name="password"
                                type="password"
                                autoFocus
                                autoComplete="on"
                                aria-invalid={hasPasswordError}
                                className={cn("pr-10", hasPasswordError ? "border-destructive" : undefined)}
                            />
                        </PasswordWrapper>

                        {hasPasswordError && (
                            <p
                                className="text-sm text-destructive"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </div>

                    <div className="flex justify-end">
                        {realm.resetPasswordAllowed && (
                            <a
                                tabIndex={5}
                                href={url.loginResetCredentialsUrl}
                                className="text-sm text-primary hover:underline"
                            >
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    <Button
                        tabIndex={4}
                        className="w-full"
                        type="submit"
                        disabled={isLoginButtonDisabled}
                    >
                        {msgStr("doLogIn")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { i18n: I18n; passwordInputId: string; children: React.ReactElement }) {
    const { i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className="relative">
            {children}
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}
