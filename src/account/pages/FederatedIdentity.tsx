import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ResponsiveCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { accountLabels } from "../labels";

export default function FederatedIdentity(
  props: PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, unknown>
) {
  const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;

  const { url, federatedIdentity, stateChecker } = kcContext;
  const { federatedIdentity: federatedIdentityText, common } = accountLabels;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="social">
      <div className="mt-6 space-y-4">
        {federatedIdentity.identities.map(identity => (
          <Card key={identity.providerId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {federatedIdentityText.title}
                </h2>
                </div>
                <CardTitle className="text-base font-medium">
                  {identity.displayName}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* 用户名输入框 */}
                <div className="w-full sm:w-1/2">
                  <Label htmlFor={identity.providerId} className="sr-only">
                    {identity.displayName}
                  </Label>
                  <Input
                    id={identity.providerId}
                    disabled
                    value={identity.userName}
                    className="bg-muted text-muted-foreground"
                  />
                </div>

                {/* 操作按钮 */}
                <div className="flex-1">
                  {identity.connected ? (
                    federatedIdentity.removeLinkPossible && (
                      <form
                        action={url.socialUrl}
                        method="post"
                        className="inline-flex"
                      >
                        <input
                          type="hidden"
                          name="stateChecker"
                          value={stateChecker}
                        />
                        <input type="hidden" name="action" value="remove" />
                        <input
                          type="hidden"
                          name="providerId"
                          value={identity.providerId}
                        />
                        <Button
                          id={`remove-link-${identity.providerId}`}
                          variant="outline"
                          type="submit"
                          className="font-medium"
                        >
                          {common.remove}
                        </Button>
                      </form>
                    )
                  ) : (
                    <form
                      action={url.socialUrl}
                      method="post"
                      className="inline-flex"
                    >
                      <input
                        type="hidden"
                        name="stateChecker"
                        value={stateChecker}
                      />
                      <input type="hidden" name="action" value="add" />
                      <input
                        type="hidden"
                        name="providerId"
                        value={identity.providerId}
                      />
                      <Button
                        id={`add-link-${identity.providerId}`}
                        variant="outline"
                        type="submit"
                        className="font-medium"
                      >
                        {common.add}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
          </Card>
        ))}
      </div>
    </Template>
  );
}
