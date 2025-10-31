import type { Key } from "react";
// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ResponsiveCard";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { accountLabels } from "../labels";

export default function Log(
    props: PageProps<Extract<KcContext, { pageId: "log.ftl" }>, unknown>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes
    // });

    const { log } = kcContext;
    const { common, log: logText } = accountLabels;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="log">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">
                        {logText.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[180px]">{common.date}</TableHead>
                                    <TableHead>{common.event}</TableHead>
                                    <TableHead>{common.ip}</TableHead>
                                    <TableHead>{common.clients}</TableHead>
                                    <TableHead>{common.details}</TableHead>
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
                                                        {detailIndex < event.details.length - 1 && ", "}
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
        </Template>
    );
}
