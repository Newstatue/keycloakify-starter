import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        {msg("noAccount")}{" "}
                        <a tabIndex={8} href={url.registrationUrl} className="text-primary hover:underline font-medium">
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div className="space-y-5">
                            <Separator />
                            <div>
                                <h2 className="text-lg font-semibold text-center mb-4">{msg("identity-provider-login-label")}</h2>
                                <div className={`grid gap-3 ${social.providers.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>
                                    {social.providers.map((p) => (
                                        <Button
                                            key={p.alias}
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <a id={`social-${p.alias}`} href={p.loginUrl}>
                                                {p.iconClasses && <i className={`${p.iconClasses} mr-2`} aria-hidden="true"></i>}
                                                <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }} />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            }
        >
            <div className="space-y-6">
                {realm.password && (
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
                        {!usernameHidden && (
                            <div className="space-y-3">
                                <Label htmlFor="username">
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                          ? msg("usernameOrEmail")
                                          : msg("email")}
                                </Label>
                                <Input
                                    tabIndex={2}
                                    id="username"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    className={messagesPerField.existsError("username", "password") ? "border-destructive" : ""}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <p
                                        className="text-sm text-destructive"
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="password">{msg("password")}</Label>
                            <PasswordWrapper i18n={i18n} passwordInputId="password">
                                <Input
                                    tabIndex={3}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                    className={messagesPerField.existsError("username", "password") ? "border-destructive pr-10" : "pr-10"}
                                />
                            </PasswordWrapper>
                            {usernameHidden && messagesPerField.existsError("username", "password") && (
                                <p
                                    className="text-sm text-destructive"
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            {realm.rememberMe && !usernameHidden && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rememberMe"
                                        name="rememberMe"
                                        defaultChecked={!!login.rememberMe}
                                        tabIndex={5}
                                    />
                                    <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                                        {msg("rememberMe")}
                                    </Label>
                                </div>
                            )}
                            {realm.resetPasswordAllowed && (
                                <a
                                    tabIndex={6}
                                    href={url.loginResetCredentialsUrl}
                                    className="text-sm text-primary hover:underline"
                                >
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                        <Button
                            tabIndex={7}
                            disabled={isLoginButtonDisabled}
                            className="w-full"
                            type="submit"
                        >
                            {msgStr("doLogIn")}
                        </Button>
                    </form>
                )}
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
