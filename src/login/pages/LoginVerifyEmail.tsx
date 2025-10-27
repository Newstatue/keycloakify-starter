import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <Card className="p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                        {msg("emailVerifyInstruction2")}
                        <br />
                        <Button variant="link" className="p-0 h-auto font-normal" asChild>
                            <a href={url.loginAction}>{msg("doClickHere")}</a>
                        </Button>
                        {" "}
                        {msg("emailVerifyInstruction3")}
                    </p>
                </Card>
            }
        >
            <div className="space-y-6">
                <div className="text-center">
                    <p className="text-muted-foreground">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
                </div>
            </div>
        </Template>
    );
}
