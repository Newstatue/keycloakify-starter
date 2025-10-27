import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("termsTitle")}
        >
            <div className="space-y-4">
                <Card className="p-4">
                    <ScrollArea className="h-[300px] w-full rounded-md">
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {msg("termsText")}
                        </div>
                    </ScrollArea>
                </Card>
                <form className="flex gap-3" action={url.loginAction} method="POST">
                    <Button
                        className="flex-1"
                        name="accept"
                        id="kc-accept"
                        type="submit"
                    >
                        {msgStr("doAccept")}
                    </Button>
                    <Button
                        className="flex-1"
                        variant="outline"
                        name="cancel"
                        id="kc-decline"
                        type="submit"
                    >
                        {msgStr("doDecline")}
                    </Button>
                </form>
            </div>
        </Template>
    );
}
