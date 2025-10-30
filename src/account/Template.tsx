import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

// ✅ shadcn/ui components
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr } = i18n;
    const { url, features, realm, message, referrer } = kcContext;

    useEffect(() => {
        document.title = msgStr("accountManagementTitle");
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass"),
    });

    useSetClassName({
        qualifiedName: "body",
        className: clsx("bg-background text-foreground min-h-screen", kcClsx("kcBodyClass")),
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) return null;

    // ✅ 封装导航菜单部分（重用）
    const SidebarMenu = (
        <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex flex-col space-y-1">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={active === "account"}>
                        <a
                            href={url.accountUrl}
                            className={clsx(
                                "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                active === "account" && "bg-accent text-accent-foreground"
                            )}
                        >
                            {msg("account")}
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {features.passwordUpdateSupported && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild active={active === "password"}>
                            <a
                                href={url.passwordUrl}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    active === "password" && "bg-accent text-accent-foreground"
                                )}
                            >
                                {msg("password")}
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={active === "totp"}>
                        <a
                            href={url.totpUrl}
                            className={clsx(
                                "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                active === "totp" && "bg-accent text-accent-foreground"
                            )}
                        >
                            {msg("authenticator")}
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {features.identityFederation && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild active={active === "social"}>
                            <a
                                href={url.socialUrl}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    active === "social" && "bg-accent text-accent-foreground"
                                )}
                            >
                                {msg("federatedIdentity")}
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}

                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={active === "sessions"}>
                        <a
                            href={url.sessionsUrl}
                            className={clsx(
                                "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                active === "sessions" && "bg-accent text-accent-foreground"
                            )}
                        >
                            {msg("sessions")}
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild active={active === "applications"}>
                        <a
                            href={url.applicationsUrl}
                            className={clsx(
                                "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                active === "applications" && "bg-accent text-accent-foreground"
                            )}
                        >
                            {msg("applications")}
                        </a>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {features.log && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild active={active === "log"}>
                            <a
                                href={url.logUrl}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    active === "log" && "bg-accent text-accent-foreground"
                                )}
                            >
                                {msg("log")}
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}

                {realm.userManagedAccessAllowed && features.authorization && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild active={active === "authorization"}>
                            <a
                                href={url.resourceUrl}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    active === "authorization" && "bg-accent text-accent-foreground"
                                )}
                            >
                                {msg("myResources")}
                            </a>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );

    return (
        <>
            {/* 顶部导航栏 */}
            <header className="border-b bg-card shadow-sm">
                <nav className="flex items-center justify-between px-6 py-4">
                    <div className="text-xl font-semibold tracking-tight">EVORSIO</div>

                    {/* ✅ 移动端汉堡菜单 */}
                    <div className="flex items-center gap-2 md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                                                    <Card className="h-full rounded-none border-0">
                                    <CardHeader>
                                        <CardTitle>{msg("accountManagementTitle")}</CardTitle>
                                    </CardHeader>
                                    <CardContent>{SidebarMenu}</CardContent>
                                </Card>
                            </SheetContent>
                        </Sheet>

                        {referrer?.url && (
                            <Button asChild variant="outline" size="sm">
                                <a href={referrer.url}>{msg("backTo", referrer.name)}</a>
                            </Button>
                        )}

                        <Button asChild variant="destructive" size="sm">
                            <a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
                        </Button>
                    </div>

                    {/* ✅ 桌面版操作按钮 */}
                    <div className="hidden md:flex items-center space-x-4">
                        {referrer?.url && (
                            <Button asChild variant="outline" size="sm">
                                <a href={referrer.url}>{msg("backTo", referrer.name)}</a>
                            </Button>
                        )}
                        <Button asChild variant="destructive" size="sm">
                            <a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
                        </Button>
                    </div>
                </nav>
            </header>

            {/* 主体内容 */}
            <div className="container mx-auto flex flex-col md:flex-row gap-6 mt-8">
                {/* ✅ 桌面版侧边栏 */}
                <aside className="hidden md:block w-1/4">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>{msg("accountSettingsSidebarTitle" as any)}</CardTitle>
                        </CardHeader>
                        <CardContent>{SidebarMenu}</CardContent>
                    </Card>
                </aside>

                {/* 内容区 */}
                <main className="flex-1">
                    {message && (
                        <Alert
                            variant={message.type === "error" ? "destructive" : "default"}
                            className="mb-4"
                        >
                            <AlertTitle>
                                {message.type === "success" ? msg("operationSuccess") : msg("operationError")}
                            </AlertTitle>
                            <AlertDescription
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary),
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
