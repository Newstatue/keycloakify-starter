import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Password(
    props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;

    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "password")
    };

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, password, account, stateChecker } = kcContext;
    const { msgStr, msg } = i18n;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
    const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
    const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

    const checkNewPassword = (newPassword: string) => {
        if (!password.passwordSet) return;
        if (newPassword === currentPassword) {
            setNewPasswordError(msgStr("newPasswordSameAsOld"));
        } else {
            setNewPasswordError("");
        }
    };

    const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
        if (newPasswordConfirm === "") return;
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(msgStr("passwordConfirmNotMatch"));
        } else {
            setNewPasswordConfirmError("");
        }
    };

    return (
        <Template
            {...{
                kcContext: {
                    ...kcContext,
                    message: (() => {
                        if (newPasswordError !== "") {
                            return { type: "error", summary: newPasswordError };
                        }
                        if (newPasswordConfirmError !== "") {
                            return { type: "error", summary: newPasswordConfirmError };
                        }
                        return kcContext.message;
                    })()
                },
                i18n,
                doUseDefaultCss,
                classes
            }}
            active="password"
        >

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>{msg("changePasswordHtmlTitle")}</CardTitle>
                    <CardDescription>{msg("allFieldsRequired")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={url.passwordUrl}
                        method="post"
                        className="space-y-5"
                    >
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={account.username ?? ""}
                            autoComplete="username"
                            readOnly
                            className="hidden"
                        />

                        {password.passwordSet && (
                            <div className="space-y-2">
                                <Label htmlFor="password">{msg("password")}</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoFocus
                                    autoComplete="current-password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                        )}

                        <input
                            type="hidden"
                            id="stateChecker"
                            name="stateChecker"
                            value={stateChecker}
                        />

                        <div className="space-y-2">
                            <Label htmlFor="password-new">{msg("passwordNew")}</Label>
                            <Input
                                type="password"
                                id="password-new"
                                name="password-new"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewPassword(value);
                                    if (hasNewPasswordBlurred) checkNewPassword(value);
                                }}
                                onBlur={() => {
                                    setHasNewPasswordBlurred(true);
                                    checkNewPassword(newPassword);
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password-confirm">{msg("passwordConfirm")}</Label>
                            <Input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                autoComplete="new-password"
                                value={newPasswordConfirm}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewPasswordConfirm(value);
                                    if (hasNewPasswordConfirmBlurred)
                                        checkNewPasswordConfirm(value);
                                }}
                                onBlur={() => {
                                    setHasNewPasswordConfirmBlurred(true);
                                    checkNewPasswordConfirm(newPasswordConfirm);
                                }}
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                name="submitAction"
                                value="Save"
                                disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                            >
                                {msg("doSave")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Template>
    );
}
