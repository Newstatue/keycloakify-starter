"use client";

import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useUserProfile, useI18nMessages } from "../api";
import { useOidc } from "../oidc";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Account(
    props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template } = props;

    const classes = {
        ...props.classes,
        kcBodyClass: clsx(props.classes?.kcBodyClass, "user"),
    };

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes,
    // });

    const { url, realm, messagesPerField, stateChecker, referrer } = kcContext;
    const { msg } = i18n;

    const { goToAuthServer, backFromAuthServer } = useOidc();
    const { userProfile } = useUserProfile();
    const { i18nMessages } = useI18nMessages();

    if (userProfile === undefined || i18nMessages === undefined) {
        return null;
    }

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
            <div className="w-full md:shadow-lg md:bg-card md:border md:rounded-lg mt-6">
                <div className="md:p-6">
                    <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            {msg("editAccountHtmlTitle")}
                        </CardTitle>
                        <CardDescription>
                            <span className="text-sm text-muted-foreground">
                                <span className="text-red-500">*</span> {msg("requiredFields")}
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

                            {!realm.registrationEmailAsUsername && (
                                <div className="space-y-2">
                                    <Label htmlFor="username">
                                        {msg("username")}
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
                                    {msg("email")} <span className="text-red-500">*</span>
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
                                    {msg("firstName")} <span className="text-red-500">*</span>
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
                                    {msg("lastName")} <span className="text-red-500">*</span>
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
                                        {msg("backToApplication")}
                                    </a>
                                )}
                                <div className="flex gap-3">
                                    <Button type="submit" name="submitAction" value="Save">
                                        {msg("doSave")}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        type="submit"
                                        name="submitAction"
                                        value="Cancel"
                                    >
                                        {msg("doCancel")}
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
                                                {msg("profileSuccessfullyUpdated" as any)}
                                            </span>
                                        );
                                    case "cancelled":
                                        return (
                                            <span className="text-red-600">
                                                {msg("profileUnchanged" as any)}
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
                        {msg("updateProfileViaLoginTheme" as any)}
                    </Button>

                    <Button
                        onClick={() =>
                            goToAuthServer({
                                extraQueryParams: { kc_action: "delete_account" },
                            })
                        }
                    >
                        {msg("deleteAccount" as any)}
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
                                {msg("changePasswordHtmlTitle")}
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
                                                                {msg("passwordSuccessfullyUpdated" as any)}
                                                            </span>
                                                        );
                                                    case "cancelled":
                                                        return (
                                                            <span className="text-red-600">
                                                                {msg("passwordUnchanged" as any)}
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
            </div>
            </div>
        </Template>
    );
}