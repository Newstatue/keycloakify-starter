// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function Applications(
    props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes
    // });

    const { url, applications: applicationsWrapper, stateChecker } = kcContext;
    const applicationList = applicationsWrapper?.applications ?? [];

    const { common, applications: applicationsText } = accountLabels;
    const { advancedMsg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="applications">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>{applicationsText.title}</CardTitle>
                </CardHeader>

                <CardContent>
                    <form action={url.applicationsUrl} method="post" className="space-y-4">
                        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                        <input type="hidden" id="referrer" name="referrer" value={stateChecker} />

                        <div className="overflow-x-auto rounded-md border">
                            <Table className="w-full min-w-[600px]">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[20%]">{common.application}</TableHead>
                                        <TableHead className="hidden md:table-cell w-[25%]">{common.availableRoles}</TableHead>
                                        <TableHead className="w-[30%]">{common.grantedPermissions}</TableHead>
                                        <TableHead className="hidden md:table-cell w-[20%]">{common.additionalGrants}</TableHead>
                                        <TableHead className="w-[10%] text-right">{common.action}</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {applicationList.map((application, index) => {
                                        const client = application.client ?? {};
                                        const clientId = client.clientId ?? client.id ?? `client-${index}`;
                                        const clientName =
                                            typeof client.name === "string" ? advancedMsg(client.name) : undefined;
                                        const clientEffectiveUrl = application.effectiveUrl;
                                        const renderClientLabel =
                                            clientName || clientId || applicationsText.unknownClient;

                                        const realmRoleLabels: (string | React.ReactElement)[] = (application.realmRolesAvailable ?? [])
                                            .filter(role => role && Object.keys(role).length > 0)
                                            .flatMap(role => {
                                                const label = role?.description
                                                    ? advancedMsg(role.description)
                                                    : role?.name
                                                    ? advancedMsg(role.name)
                                                    : undefined;
                                                return label ? [label] : [];
                                            });

                                        const resourceRoleLabels: (string | React.ReactElement)[] = Object.entries(
                                            application.resourceRolesAvailable ?? {}
                                        ).flatMap(([resource, roles]) =>
                                            (roles ?? []).flatMap(role => {
                                                const roleLabel = role?.roleDescription
                                                    ? advancedMsg(role.roleDescription)
                                                    : role?.roleName
                                                    ? advancedMsg(role.roleName)
                                                    : undefined;
                                                const clientLabel =
                                                    (role?.clientName ? advancedMsg(role.clientName) : undefined) ??
                                                    role?.clientId ??
                                                    resource;
                                                const label = roleLabel
                                                    ? <>{roleLabel} {common.inResource} {clientLabel}</>
                                                    : clientLabel;
                                                return label ? [label] : [];
                                            })
                                        );

                                        const availableRoleBadges: (string | React.ReactElement)[] = [
                                            ...realmRoleLabels,
                                            ...resourceRoleLabels
                                        ];

                                        const grantedPermissionBadges: (string | React.ReactElement)[] = client.consentRequired
                                            ? (application.clientScopesGranted ?? [])
                                                  .map(scope => advancedMsg(scope))
                                                  .filter(Boolean)
                                            : [common.fullAccess];

                                        const additionalGrantBadges: (string | React.ReactElement)[] =
                                            (application.additionalGrants ?? [])
                                                .map(grant => advancedMsg(grant))
                                                .filter(Boolean);

                                        return (
                                            <TableRow key={clientId}>
                                                <TableCell>
                                                    {clientEffectiveUrl ? (
                                                        <a
                                                            href={clientEffectiveUrl}
                                                            className="text-primary hover:underline"
                                                        >
                                                            {renderClientLabel}
                                                        </a>
                                                    ) : (
                                                        renderClientLabel
                                                    )}
                                                </TableCell>

                                                <TableCell className="hidden md:table-cell">
                                                    <RoleList items={availableRoleBadges} emptyLabel="-" />
                                                </TableCell>

                                                <TableCell>
                                                    <RoleList items={grantedPermissionBadges} emptyLabel="-" />
                                                </TableCell>

                                                <TableCell className="hidden md:table-cell">
                                                    <RoleList items={additionalGrantBadges} emptyLabel="-" />
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {(client.consentRequired &&
                                                        (application.clientScopesGranted?.length ?? 0) >
                                                            0) ||
                                                    (application.additionalGrants?.length ?? 0) > 0 ? (
                                                        <Button
                                                            type="submit"
                                                            id={`revoke-${clientId}`}
                                                            name="clientId"
                                                            value={client.id ?? clientId}
                                                            className="font-medium"
                                                        >
                                                            {common.revoke}
                                                        </Button>
                                                    ) : null}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Template>
    );
}

function RoleList(props: { items: (string | React.ReactElement)[]; emptyLabel?: string }) {
    const { items, emptyLabel = "-" } = props;

    if (items.length === 0) {
        return <span className="text-sm text-muted-foreground">{emptyLabel}</span>;
    }

    return (
        <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1">
            {items.map((item, index) => (
                <Badge
                    key={`${item}-${index}`}
                    variant="secondary"
                    className="break-words whitespace-normal px-2 py-1 text-xs"
                >
                    {item}
                </Badge>
            ))}
        </div>
    );
}


