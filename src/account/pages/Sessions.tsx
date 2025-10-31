import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ResponsiveCard";
import { accountLabels } from "../labels";

export default function Sessions(
  props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, unknown>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, stateChecker, sessions } = kcContext;
  const { sessions: sessionsText, common } = accountLabels;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="sessions">
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {sessionsText.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{common.ip}</TableHead>
                  <TableHead>{common.started}</TableHead>
                  <TableHead>{common.lastAccess}</TableHead>
                  <TableHead>{common.expires}</TableHead>
                  <TableHead>{common.clients}</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sessions.sessions.map((session, index: number) => (
                  <TableRow key={index} className="hover:bg-muted/40">
                    <TableCell>{session.ipAddress}</TableCell>
                    <TableCell>{session?.started}</TableCell>
                    <TableCell>{session?.lastAccess}</TableCell>
                    <TableCell>{session?.expires}</TableCell>
                    <TableCell>
                      {session.clients.map((client: string, clientIndex: number) => (
                        <div key={clientIndex} className="text-sm leading-tight">
                          {client}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <form action={url.sessionsUrl} method="post" className="flex justify-end">
            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
            <Button
              id="logout-all-sessions"
              type="submit"
              variant="destructive"
              className={kcClsx("kcButtonDefaultClass", "kcButtonClass")}
            >
              {common.logoutAllSessions}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Template>
  );
}






