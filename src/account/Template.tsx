import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { KcContext } from "./KcContext";
import { accountLabels } from "./labels";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ResponsiveCard";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

type NavigationKey =
    | "account"
    | "password"
    | "totp"
    | "social"
    | "sessions"
    | "applications"
    | "log"
    | "authorization";

const NAV_LABEL = accountLabels.template.navTitle;

const normalizeHref = (href: string) => {
    if (!href?.includes("#/")) {
        return href;
    }

    if (typeof window === "undefined") {
        return href;
    }

    try {
        const urlObj = new URL(href, window.location.origin);
        if (!urlObj.hash.startsWith("#/")) {
            return href;
        }

        const hashSegment = urlObj.hash.slice(2);
        urlObj.hash = "";

        const sanitizedPath = urlObj.pathname.endsWith("/")
            ? urlObj.pathname.slice(0, -1)
            : urlObj.pathname;

        urlObj.pathname = hashSegment
            ? `${sanitizedPath}/${hashSegment}`.replace(/\/{2,}/g, "/")
            : sanitizedPath;

        return urlObj.toString();
    } catch {
        return href;
    }
};

export default function Template(props: TemplateProps<KcContext, unknown>) {
    const { kcContext, doUseDefaultCss, active, classes, children } = props;
    const { i18n: _unusedI18n } = props;
    void _unusedI18n;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, features, realm, message, referrer } = kcContext;
    const messageTypeLabel =
        (message?.type && accountLabels.messages.types[message.type.toLowerCase()]) ??
        message?.type;
    const rawSummary =
        typeof message?.summary === "string" ? message.summary.trim() : message?.summary;
    const messageSummary =
        typeof rawSummary === "string"
            ? accountLabels.messages.overrides[rawSummary] ?? rawSummary
            : rawSummary;

    useEffect(() => {
        document.title = accountLabels.template.pageTitle;
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx("bg-background text-foreground", kcClsx("kcBodyClass"))
    });

    const navigationItems = [
        {
            key: "account" as NavigationKey,
            href: normalizeHref(url.accountUrl),
            label: accountLabels.template.navItems.account,
            isVisible: true
        },
        {
            key: "password" as NavigationKey,
            href: normalizeHref(url.passwordUrl),
            label: accountLabels.template.navItems.password,
            isVisible: features.passwordUpdateSupported
        },
        {
            key: "totp" as NavigationKey,
            href: normalizeHref(url.totpUrl),
            label: accountLabels.template.navItems.totp,
            isVisible: true
        },
        {
            key: "social" as NavigationKey,
            href: normalizeHref(url.socialUrl),
            label: accountLabels.template.navItems.social,
            isVisible: features.identityFederation
        },
        {
            key: "sessions" as NavigationKey,
            href: normalizeHref(url.sessionsUrl),
            label: accountLabels.template.navItems.sessions,
            isVisible: true
        },
        {
            key: "applications" as NavigationKey,
            href: normalizeHref(url.applicationsUrl),
            label: accountLabels.template.navItems.applications,
            isVisible: true
        },
        {
            key: "log" as NavigationKey,
            href: normalizeHref(url.logUrl),
            label: accountLabels.template.navItems.log,
            isVisible: features.log
        },
        {
            key: "authorization" as NavigationKey,
            href: normalizeHref(url.resourceUrl),
            label: accountLabels.template.navItems.authorization,
            isVisible: realm.userManagedAccessAllowed && features.authorization
        }
    ].filter(({ isVisible }) => isVisible);

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) {
        return null;
    }

    const NavigationList = (
        <nav aria-label={NAV_LABEL}>
            <ul className="flex flex-col gap-1">
                {navigationItems.map(({ key, href, label }) => (
                    <li key={key}>
                        <a
                            href={href}
                            className={clsx(
                                "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                active === key && "bg-accent text-accent-foreground"
                            )}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );

    return (
        <>
            <header className="border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                    <div className="text-xl font-semibold tracking-tight">{accountLabels.template.brandTitle}</div>
                    <div className="flex items-center gap-3 md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label={accountLabels.template.openNavigation}>
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>{NAV_LABEL}</SheetTitle>
                                    <SheetDescription>选择要浏览的账户页面</SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg font-semibold">
                                                {accountLabels.template.navCardTitle}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            {NavigationList}
                                        </CardContent>
                                    </Card>
                                    {referrer?.url && (
                                        <Button asChild variant="outline">
                                            <a href={normalizeHref(referrer.url)}>
                                                {accountLabels.template.backTo(referrer.name)}
                                            </a>
                                        </Button>
                                    )}
                                    <Button asChild variant="destructive">
                                        <a href={normalizeHref(url.getLogoutUrl())}>
                                            {accountLabels.template.signOut}
                                        </a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden items-center gap-3 md:flex">
                        {referrer?.url && (
                            <Button asChild variant="outline" size="sm">
                                <a href={normalizeHref(referrer.url)}>
                                    {accountLabels.template.backTo(referrer.name)}
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="destructive" size="sm">
                            <a href={normalizeHref(url.getLogoutUrl())}>{accountLabels.template.signOut}</a>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row">
                <aside className="hidden w-full max-w-xs shrink-0 md:block">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold">
                                {accountLabels.template.navCardTitle}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {NavigationList}
                        </CardContent>
                    </Card>
                </aside>

                <main className="flex-1 space-y-6">
                    {message && messageSummary && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"}>
                            {messageTypeLabel && (
                                <AlertTitle className="capitalize">{messageTypeLabel}</AlertTitle>
                            )}
                            <AlertDescription
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messageSummary)
                                }}
                            />
                        </Alert>
                    )}
                    {children}
                </main>
            </div>
        </>
    );
}
