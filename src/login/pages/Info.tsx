import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info as InfoIcon } from "lucide-react";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >
            <div className="space-y-4">
                <Card className="p-4">
                    <div className="flex gap-3">
                        <InfoIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                    (() => {
                                        let html = message.summary?.trim();

                                        if (requiredActions) {
                                            html += " <b>";

                                            html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                            html += "</b>";
                                        }

                                        return html;
                                    })()
                                )
                            }}
                        />
                    </div>
                </Card>
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <div className="text-center">
                                <Button variant="default" asChild>
                                    <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                                </Button>
                            </div>
                        );
                    }
                    if (actionUri) {
                        return (
                            <div className="text-center">
                                <Button variant="default" asChild>
                                    <a href={actionUri}>{msg("proceedWithAction")}</a>
                                </Button>
                            </div>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <div className="text-center">
                                <Button variant="default" asChild>
                                    <a href={client.baseUrl}>{msg("backToApplication")}</a>
                                </Button>
                            </div>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
