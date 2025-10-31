import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ResponsiveCard";
import { accountLabels } from "../labels";

export default function Password(
    props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, unknown>
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
    const { password: passwordText, common } = accountLabels;

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
            setNewPasswordError(passwordText.sameAsOldError);
        } else {
            setNewPasswordError("");
        }
    };

    const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
        if (newPasswordConfirm === "") return;
        if (newPassword !== newPasswordConfirm) {
            setNewPasswordConfirmError(passwordText.confirmMismatchError);
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
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>{passwordText.title}</CardTitle>
                    <CardDescription>{passwordText.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={url.passwordUrl} method="post" className="space-y-5">
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
                                <Label htmlFor="password">{common.password}</Label>
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

                        {/* 隐藏的语言表单，确保 Keycloak 自动设置 locale=zh-CN */}
                        <input type="hidden" name="user.attributes.locale" value="zh-CN" />

                        <div className="space-y-2">
                            <Label htmlFor="password-new">{passwordText.newPassword}</Label>
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
                            <Label htmlFor="password-confirm">{passwordText.confirmPassword}</Label>
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
                                {common.save}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Template>
    );
}
