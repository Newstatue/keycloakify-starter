import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">
                        {msg("noAccount")}{" "}
                        <a tabIndex={6} href={url.registrationUrl} className="text-primary hover:underline font-medium">
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
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
                                                <span>{p.displayName}</span>
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
                                    aria-invalid={messagesPerField.existsError("username")}
                                    className={messagesPerField.existsError("username") ? "border-destructive" : ""}
                                />
                                {messagesPerField.existsError("username") && (
                                    <p className="text-sm text-destructive" aria-live="polite">
                                        {messagesPerField.getFirstError("username")}
                                    </p>
                                )}
                            </div>
                        )}

                        {realm.rememberMe && !usernameHidden && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    name="rememberMe"
                                    defaultChecked={!!login.rememberMe}
                                    tabIndex={3}
                                />
                                <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                                    {msg("rememberMe")}
                                </Label>
                            </div>
                        )}

                        <Button
                            tabIndex={4}
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
