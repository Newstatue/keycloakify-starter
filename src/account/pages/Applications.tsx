// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function Applications(
    props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes
    // });

    const {
        url,
        applications: { applications },
        stateChecker
    } = kcContext;

    const { msg, advancedMsg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="applications">
            <div className="w-full md:shadow-lg md:bg-card md:border md:rounded-lg mt-6">
                <div className="md:p-6">

                    <form action={url.applicationsUrl} method="post" className="space-y-4">
                        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                        <input type="hidden" id="referrer" name="referrer" value={stateChecker} />

                        <Card>
                        <CardHeader>
                            <CardTitle>{msg("applicationsHtmlTitle")}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="overflow-x-auto rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{msg("application")}</TableHead>
                                            <TableHead>{msg("availableRoles")}</TableHead>
                                            <TableHead>{msg("grantedPermissions")}</TableHead>
                                            <TableHead>{msg("additionalGrants")}</TableHead>
                                            <TableHead>{msg("action")}</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {applications.map(application => (
                                            <TableRow key={application.client.clientId}>
                                                <TableCell>
                                                    {application.effectiveUrl ? (
                                                        <a
                                                            href={application.effectiveUrl}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {(application.client.name &&
                                                                advancedMsg(application.client.name)) ||
                                                                application.client.clientId}
                                                        </a>
                                                    ) : (
                                                        (application.client.name &&
                                                            advancedMsg(application.client.name)) ||
                                                        application.client.clientId
                                                    )}
                                                </TableCell>

                                                <TableCell className="text-sm text-muted-foreground">
                                                    {!isArrayWithEmptyObject(
                                                        application.realmRolesAvailable
                                                    ) &&
                                                        application.realmRolesAvailable.map(
                                                            (role, index) => (
                                                                <span key={role.name}>
                                                                    {role.description
                                                                        ? advancedMsg(
                                                                            role.description
                                                                        )
                                                                        : advancedMsg(role.name)}
                                                                    {index <
                                                                        application
                                                                            .realmRolesAvailable
                                                                            .length -
                                                                        1 && ", "}
                                                                </span>
                                                            )
                                                        )}

                                                    {application.resourceRolesAvailable &&
                                                        Object.keys(
                                                            application.resourceRolesAvailable
                                                        ).map(resource => (
                                                            <span key={resource}>
                                                                {!isArrayWithEmptyObject(
                                                                    application.realmRolesAvailable
                                                                ) && ", "}
                                                                {application
                                                                    .resourceRolesAvailable[
                                                                    resource
                                                                ].map(clientRole => (
                                                                    <span
                                                                        key={clientRole.roleName}
                                                                    >
                                                                        {clientRole.roleDescription
                                                                            ? advancedMsg(
                                                                                clientRole.roleDescription
                                                                            )
                                                                            : advancedMsg(
                                                                                clientRole.roleName
                                                                            )}{" "}
                                                                        {msg("inResource")}{" "}
                                                                        <strong>
                                                                            {clientRole.clientName
                                                                                ? advancedMsg(
                                                                                    clientRole.clientName
                                                                                )
                                                                                : clientRole.clientId}
                                                                        </strong>
                                                                        {clientRole !==
                                                                            application
                                                                                .resourceRolesAvailable[
                                                                            resource
                                                                            ][
                                                                            application
                                                                                .resourceRolesAvailable[
                                                                                resource
                                                                            ].length - 1
                                                                            ] && ", "}
                                                                    </span>
                                                                ))}
                                                            </span>
                                                        ))}
                                                </TableCell>

                                                <TableCell>
                                                    {application.client.consentRequired ? (
                                                        application.clientScopesGranted.map(
                                                            claim => (
                                                                <span key={claim}>
                                                                    {advancedMsg(claim)}
                                                                    {claim !==
                                                                        application
                                                                            .clientScopesGranted[
                                                                        application
                                                                            .clientScopesGranted
                                                                            .length - 1
                                                                        ] && ", "}
                                                                </span>
                                                            )
                                                        )
                                                    ) : (
                                                        <strong>{msg("fullAccess")}</strong>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {application.additionalGrants.map(grant => (
                                                        <span key={grant}>
                                                            {advancedMsg(grant)}
                                                            {grant !==
                                                                application.additionalGrants[
                                                                application.additionalGrants
                                                                    .length - 1
                                                                ] && ", "}
                                                        </span>
                                                    ))}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {(application.client.consentRequired &&
                                                        application.clientScopesGranted.length >
                                                        0) ||
                                                        application.additionalGrants.length > 0 ? (
                                                        <Button
                                                            type="submit"
                                                            id={`revoke-${application.client.clientId}`}
                                                            name="clientId"
                                                            value={application.client.id}
                                                            className="font-medium"
                                                        >
                                                            {msg("revoke")}
                                                        </Button>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
            </div>
        </Template>
    );
}

function isArrayWithEmptyObject(variable: unknown): boolean {
    if (!Array.isArray(variable) || variable.length !== 1) return false;

    const item = variable[0];
    return typeof item === "object" && item !== null && Object.keys(item).length === 0;
}

