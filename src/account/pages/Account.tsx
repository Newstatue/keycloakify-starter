"use client";

import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { KcContext } from "../KcContext";
import { useUserProfile } from "../api";
import { useOidc } from "../oidc";
import { accountLabels } from "../labels";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ResponsiveCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Account(
    props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, unknown>
) {
    const { kcContext, doUseDefaultCss, Template, i18n } = props;
    
    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "user"),
    };

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes,
    // });

    const { url, realm, messagesPerField, stateChecker, referrer } = kcContext;
    const { goToAuthServer, backFromAuthServer } = useOidc({
        assert: "user logged in"
    });
    const { userProfile } = useUserProfile();

    if (userProfile === undefined) {
        return null;
    }

    const { account: accountText, common } = accountLabels;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{accountText.title}</CardTitle>
                    <CardDescription>
                        <span className="text-sm text-muted-foreground">
                            <span className="text-red-500">*</span> {common.requiredFields}
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={url.accountUrl} method="post" className="space-y-6">
                        <input
                            type="hidden"
                            id="stateChecker"
                            name="stateChecker"
                            value={stateChecker}
                        />

                        {/* 隐藏的语言表单，确保 Keycloak 自动设置 locale=zh-CN */}
                        <input type="hidden" name="user.attributes.locale" value="zh-CN" />

                        {!realm.registrationEmailAsUsername && (
                            <div className="space-y-2">
                                <Label htmlFor="username">
                                    {common.username}
                                    {realm.editUsernameAllowed && (
                                        <span className="text-red-500 ml-1">*</span>
                                    )}
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    disabled={!realm.editUsernameAllowed}
                                    defaultValue={userProfile.username}
                                    className={clsx(
                                        messagesPerField.printIfExists("username", "border-red-500")
                                    )}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                {common.email} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                autoFocus
                                defaultValue={userProfile.email}
                                className={clsx(
                                    messagesPerField.printIfExists("email", "border-red-500")
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="firstName">
                                {common.firstName} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                defaultValue={userProfile.firstName}
                                className={clsx(
                                    messagesPerField.printIfExists("firstName", "border-red-500")
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">
                                {common.lastName} <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                defaultValue={userProfile.lastName}
                                className={clsx(
                                    messagesPerField.printIfExists("lastName", "border-red-500")
                                )}
                            />
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-between items-center gap-3">
                            {referrer && (
                                <a
                                    href={referrer.url}
                                    className="text-sm text-muted-foreground hover:underline"
                                >
                                    {accountText.backToApplication}
                                </a>
                            )}
                            <div className="flex gap-3">
                                <Button type="submit" name="submitAction" value="Save">
                                    {common.save}
                                </Button>
                                <Button
                                    variant="outline"
                                    type="submit"
                                    name="submitAction"
                                    value="Cancel"
                                >
                                    {common.cancel}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {backFromAuthServer?.extraQueryParams.kc_action === "UPDATE_PROFILE" && (
                <Alert>
                    <AlertDescription>
                        {(() => {
                            switch (backFromAuthServer.result.kc_action_status) {
                                case "success":
                                    return (
                                        <span className="text-green-600">
                                            {accountText.profileUpdated}
                                        </span>
                                    );
                                case "cancelled":
                                    return (
                                        <span className="text-red-600">
                                            {accountText.profileUnchanged}
                                        </span>
                                    );
                            }
                        })()}
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex flex-col gap-4">
                <Button
                    onClick={() =>
                        goToAuthServer({
                            extraQueryParams: { kc_action: "UPDATE_PROFILE" },
                        })
                    }
                >
                    {accountText.updateProfileViaLoginTheme}
                </Button>

                <Button
                    onClick={() =>
                        goToAuthServer({
                            extraQueryParams: { kc_action: "delete_account" },
                        })
                    }
                >
                    {accountText.deleteAccount}
                </Button>

                {kcContext.features.passwordUpdateSupported && (
                    <>
                        <Button
                            onClick={() =>
                                goToAuthServer({
                                    extraQueryParams: { kc_action: "UPDATE_PASSWORD" },
                                })
                            }
                        >
                            {accountText.changePasswordSection}
                        </Button>

                        {backFromAuthServer?.extraQueryParams.kc_action ===
                            "UPDATE_PASSWORD" && (
                                <Alert>
                                    <AlertDescription>
                                        {(() => {
                                            switch (backFromAuthServer.result.kc_action_status) {
                                                case "success":
                                                    return (
                                                        <span className="text-green-600">
                                                            {accountText.passwordUpdated}
                                                        </span>
                                                    );
                                                case "cancelled":
                                                    return (
                                                        <span className="text-red-600">
                                                            {accountText.passwordUnchanged}
                                                        </span>
                                                    );
                                            }
                                        })()}
                                    </AlertDescription>
                                </Alert>
                            )}
                    </>
                )}
            </div>
        </Template>
    );
}



