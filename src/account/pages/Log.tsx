import type { Key } from "react";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function Log(
    props: PageProps<Extract<KcContext, { pageId: "log.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { log } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="log">
            <div className={kcClsx("kcContentWrapperClass")}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {msg("accountLogHtmlTitle")}
                    </h2>
                </div>

                <Card className="shadow-sm border border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            {msg("accountLogHtmlTitle")}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[180px]">{msg("date")}</TableHead>
                                        <TableHead>{msg("event")}</TableHead>
                                        <TableHead>{msg("ip")}</TableHead>
                                        <TableHead>{msg("client")}</TableHead>
                                        <TableHead>{msg("details")}</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {log.events.map(
                                        (
                                            event: {
                                                date: string | number | Date;
                                                event: string;
                                                ipAddress: string;
                                                client: string | null;
                                                details: { key: string; value: string }[];
                                            },
                                            index: Key
                                        ) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">
                                                    {event.date
                                                        ? new Date(event.date).toLocaleString()
                                                        : ""}
                                                </TableCell>
                                                <TableCell>{event.event}</TableCell>
                                                <TableCell>{event.ipAddress}</TableCell>
                                                <TableCell>{event.client || ""}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {event.details.map((detail, detailIndex) => (
                                                        <span key={detailIndex}>
                                                            {`${detail.key} = ${detail.value}`}
                                                            {detailIndex <
                                                                event.details.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Template>
    );
}
