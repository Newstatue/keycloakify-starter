// import { clsx } from "keycloakify/tools/clsx";
// import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ResponsiveCard";
import { accountLabels } from "../labels";

export default function Totp(
  props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  //   const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { totp, mode, url, messagesPerField, stateChecker } = kcContext;
  const { advancedMsg } = i18n;
  const { totp: totpText, common } = accountLabels;
  const policy = totp.policy ?? null;
  const policyTypeLabel =
    (policy && totpText.policyType[policy.type]) ?? policy?.type ?? "";
  const policyAlgorithm = typeof policy?.getAlgorithmKey === "function" ? policy.getAlgorithmKey() : "";
  const policyDigits = policy?.digits ?? "";
  const policyPeriod = policy?.type === "totp" ? policy.period : "";
  const policyInitialCounter = policy?.type === "hotp" ? policy.initialCounter : "";

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="totp">
      <Card className="mt-6">
        <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold">{totpText.title}</CardTitle>
                {totp.otpCredentials.length === 0 && (
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="text-destructive">*</span>
                    {common.requiredFields}
                  </div>
                )}
              </div>
            </CardHeader>
        <CardContent className="space-y-6">

              {/* 已启用 OTP 的表格 */}
              {totp.enabled && (
                <Table className="border rounded-md">
                  <TableHeader>
                    <TableRow>
                      {totp.otpCredentials.length > 1 ? (
                        <>
                          <TableHead colSpan={4} className="font-semibold">
                            {totpText.configureAuthenticators}
                          </TableHead>
                        </>
                      ) : (
                        <TableHead colSpan={3} className="font-semibold">
                          {totpText.configureAuthenticators}
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {totp.otpCredentials.map((credential, index) => (
                      <TableRow key={index}>
                        <TableCell>{totpText.mobile}</TableCell>
                        {totp.otpCredentials.length > 1 && (
                          <TableCell>{credential.id}</TableCell>
                        )}
                        <TableCell>{credential.userLabel || ""}</TableCell>
                        <TableCell>
                          <form
                            action={url.totpUrl}
                            method="post"
                            className="inline-flex"
                          >
                            <input
                              type="hidden"
                              name="stateChecker"
                              value={stateChecker}
                            />
                            <input type="hidden" name="submitAction" value="Delete" />
                            <input
                              type="hidden"
                              name="credentialId"
                              value={credential.id}
                            />
                            <Button
                              id={`remove-mobile-${index}`}
                              variant="outline"
                              size="sm"
                            >{common.remove}
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* 未启用 OTP 时的步骤指引 */}
              {!totp.enabled && (
                <div className="space-y-6">
                  <Separator />
                  <ol id="kc-totp-settings" className="list-decimal pl-6 space-y-4">
                    <li>
                      <p>{totpText.step1}</p>
                      <ul className="list-disc pl-4">
                        {totp.supportedApplications?.map((app) => (
                          <li key={app}>{advancedMsg(app)}</li>
                        ))}
                      </ul>
                    </li>

                    {mode && mode === "manual" ? (
                      <>
                        <li>
                          <p>{totpText.manualStep2}</p>
                          <p className="font-mono bg-muted p-2 rounded-md">
                            {totp.totpSecretEncoded}
                          </p>
                          <p>
                            <a
                              href={totp.qrUrl}
                              id="mode-barcode"
                              className="text-primary underline"
                            >
                              {totpText.scanBarcode}
                            </a>
                          </p>
                        </li>
                        <li>
                          <p>{totpText.manualStep3}</p>
                          <ul className="list-disc pl-4">
                            {policyTypeLabel && (
                              <li>
                                {totpText.typeLabel}: {policyTypeLabel}
                              </li>
                            )}
                            {policyAlgorithm && (
                              <li>
                                {totpText.algorithmLabel}: {policyAlgorithm}
                              </li>
                            )}
                            {policy?.digits !== undefined && (
                              <li>
                                {totpText.digitsLabel}: {policyDigits}
                              </li>
                            )}
                            {policy?.type === "totp" && policyPeriod !== "" && (
                              <li>
                                {totpText.intervalLabel}: {policyPeriod}
                              </li>
                            )}
                            {policy?.type === "hotp" && policyInitialCounter !== "" && (
                              <li>
                                {totpText.counterLabel}: {policyInitialCounter}
                              </li>
                            )}
                          </ul>
                        </li>
                      </>
                    ) : (
                      <li>
                        <p>{totpText.step2}</p>
                        <img
                          src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                          alt="QR Code"
                          className="mx-auto w-48 h-48"
                        />
                        <p>
                          <a
                            href={totp.manualUrl}
                            id="mode-manual"
                            className="text-primary underline"
                          >
                            {totpText.unableToScan}
                          </a>
                        </p>
                      </li>
                    )}

                    <li>
                      <p>{totpText.step3}</p>
                      <p>{totpText.step3DeviceName}</p>
                    </li>
                  </ol>

                  <Separator />

                  {/* 表单 */}
                  <form
                    action={url.totpUrl}
                    id="kc-totp-settings-form"
                    method="post"
                    className="space-y-6"
                  >
                    <input type="hidden" name="stateChecker" value={stateChecker} />

                    {/* 验证码输入 */}
                    <div className="grid gap-2">
                      <Label htmlFor="totp">
                        {common.authenticatorCode}
                        <span className="text-destructive ml-1">*</span>
                      </Label>
                      <Input
                        id="totp"
                        name="totp"
                        autoComplete="off"
                        aria-invalid={messagesPerField.existsError("totp")}
                      />
                      {messagesPerField.existsError("totp") && (
                        <p
                          className="text-destructive text-sm"
                          dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("totp")),
                          }}
                        />
                      )}
                    </div>

                    {/* 隐藏字段 */}
                    <input type="hidden" name="totpSecret" value={totp.totpSecret} />
                    {mode && <input type="hidden" id="mode" value={mode} />}

                    {/* 设备名输入 */}
                    <div className="grid gap-2">
                      <Label htmlFor="userLabel">
                        {common.deviceName}
                        {totp.otpCredentials.length >= 1 && (
                          <span className="text-destructive ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        id="userLabel"
                        name="userLabel"
                        autoComplete="off"
                        aria-invalid={messagesPerField.existsError("userLabel")}
                      />
                      {messagesPerField.existsError("userLabel") && (
                        <p
                          className="text-destructive text-sm"
                          dangerouslySetInnerHTML={{
                            __html: kcSanitize(messagesPerField.get("userLabel")),
                          }}
                        />
                      )}
                    </div>

                    {/* 按钮 */}
                    <div className="flex justify-end gap-3">
                      <Button type="submit" id="saveTOTPBtn">
                        {common.save}
                      </Button>
                      <Button
                        type="submit"
                        id="cancelTOTPBtn"
                        name="submitAction"
                        value="Cancel"
                        variant="outline"
                      >
                        {common.cancel}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
        </CardContent>
      </Card>
    </Template>
  );
}






