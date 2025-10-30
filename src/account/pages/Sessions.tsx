import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Sessions(
  props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, stateChecker, sessions } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="sessions">
      <div className="w-full md:shadow-lg md:bg-card md:border md:rounded-lg mt-6">
        <div className="md:p-6">
          <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {msg("sessionsHtmlTitle")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{msg("ip")}</TableHead>
                    <TableHead>{msg("started")}</TableHead>
                    <TableHead>{msg("lastAccess")}</TableHead>
                    <TableHead>{msg("expires")}</TableHead>
                    <TableHead>{msg("clients")}</TableHead>
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

            <form
              action={url.sessionsUrl}
              method="post"
              className="flex justify-end mt-6"
            >
              <input
                type="hidden"
                id="stateChecker"
                name="stateChecker"
                value={stateChecker}
              />
              <Button
                id="logout-all-sessions"
                type="submit"
                variant="destructive"
                className={kcClsx("kcButtonDefaultClass", "kcButtonClass")}
              >
                {msg("doLogOutAllSessions")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      </div>
    </Template>
  );
}
