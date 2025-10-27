import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import type { JSX } from "keycloakify/tools/JSX";
import { Fragment, cloneElement, useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import { assert } from "keycloakify/tools/assert";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import {
    useUserProfileForm,
    getButtonToDisplayForMultivaluedAttributeField,
    type FormAction,
    type FormFieldError
} from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    const groupNameRef = { current: "" };

    return (
        <div className="space-y-4">
            {formFieldStates.map(({ attribute, displayableErrors, valueOrValues }) => (
                <Fragment key={attribute.name}>
                    <div className="space-y-3">
                        <GroupLabel attribute={attribute} groupNameRef={groupNameRef} i18n={i18n} kcClsx={kcClsx} />
                        {BeforeField !== undefined && (
                            <BeforeField
                                attribute={attribute}
                                dispatchFormAction={dispatchFormAction}
                                displayableErrors={displayableErrors}
                                valueOrValues={valueOrValues}
                                kcClsx={kcClsx}
                                i18n={i18n}
                            />
                        )}
                        <div
                            className={cn(kcClsx("kcFormGroupClass"), "space-y-2")}
                            style={{
                                display:
                                    attribute.annotations.inputType === "hidden" ||
                                    (attribute.name === "password-confirm" && !doMakeUserConfirmPassword)
                                        ? "none"
                                        : undefined
                            }}
                        >
                            <div className={cn(kcClsx("kcLabelWrapperClass"), "flex items-center gap-1")}>
                                <Label htmlFor={attribute.name} className={cn(kcClsx("kcLabelClass"), "text-sm font-medium")}>
                                    {advancedMsg(attribute.displayName ?? "")}
                                </Label>
                                {attribute.required && <> *</>}
                            </div>
                            <div className={cn(kcClsx("kcInputWrapperClass"), "space-y-2")}>
                                {attribute.annotations.inputHelperTextBefore !== undefined && (
                                    <p
                                        className={cn(kcClsx("kcInputHelperTextBeforeClass"), "text-sm text-muted-foreground")}
                                        id={`form-help-text-before-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                    </p>
                                )}
                                <InputFieldByType
                                    attribute={attribute}
                                    valueOrValues={valueOrValues}
                                    displayableErrors={displayableErrors}
                                    dispatchFormAction={dispatchFormAction}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                                <FieldErrors attribute={attribute} displayableErrors={displayableErrors} kcClsx={kcClsx} fieldIndex={undefined} />
                                {attribute.annotations.inputHelperTextAfter !== undefined && (
                                    <p
                                        className={cn(kcClsx("kcInputHelperTextAfterClass"), "text-sm text-muted-foreground")}
                                        id={`form-help-text-after-${attribute.name}`}
                                        aria-live="polite"
                                    >
                                        {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                    </p>
                                )}
                                {AfterField !== undefined && (
                                    <AfterField
                                        attribute={attribute}
                                        dispatchFormAction={dispatchFormAction}
                                        displayableErrors={displayableErrors}
                                        valueOrValues={valueOrValues}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                )}
                                {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

function GroupLabel(props: {
    attribute: Attribute;
    groupNameRef: {
        current: string;
    };
    i18n: I18n;
    kcClsx: KcClsx;
}) {
    const { attribute, groupNameRef, i18n, kcClsx } = props;

    const { advancedMsg } = i18n;

    if (attribute.group?.name !== groupNameRef.current) {
        groupNameRef.current = attribute.group?.name ?? "";

        if (groupNameRef.current !== "") {
            assert(attribute.group !== undefined);

            return (
                <div
                    className={cn(kcClsx("kcFormGroupClass"), "space-y-2")}
                    {...Object.fromEntries(Object.entries(attribute.group.html5DataAnnotations).map(([key, value]) => [`data-${key}`, value]))}
                >
                    {(() => {
                        const groupDisplayHeader = attribute.group.displayHeader ?? "";
                        const groupHeaderText = groupDisplayHeader !== "" ? advancedMsg(groupDisplayHeader) : attribute.group.name;

                        return (
                            <div className={cn(kcClsx("kcContentWrapperClass"), "space-y-1")}>
                                <p id={`header-${attribute.group.name}`} className={cn(kcClsx("kcFormGroupHeader"), "text-base font-semibold")}>
                                    {groupHeaderText}
                                </p>
                            </div>
                        );
                    })()}
                    {(() => {
                        const groupDisplayDescription = attribute.group.displayDescription ?? "";

                        if (groupDisplayDescription !== "") {
                            const groupDescriptionText = advancedMsg(groupDisplayDescription);

                            return (
                                <p
                                    id={`description-${attribute.group.name}`}
                                    className={cn(kcClsx("kcLabelClass"), "text-sm text-muted-foreground")}
                                >
                                    {groupDescriptionText}
                                </p>
                            );
                        }

                        return null;
                    })()}
                </div>
            );
        }
    }

    return null;
}

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined; kcClsx: KcClsx }) {
    const { attribute, fieldIndex, kcClsx } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <p
            id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`}
            className={cn(kcClsx("kcInputErrorMessageClass"), "text-sm text-destructive")}
            aria-live="polite"
        >
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i, arr) => (
                    <Fragment key={i}>
                        {errorMessage}
                        {arr.length - 1 !== i && <br />}
                    </Fragment>
                ))}
        </p>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues } = props;

    switch (attribute.annotations.inputType) {
        // NOTE: Unfortunately, keycloak won't let you define input type="hidden" in the Admin Console.
        // sometimes in the future it might.
        case "hidden":
            return <input type="hidden" name={attribute.name} value={valueOrValues} />;
        case "textarea":
            return <TextareaTag {...props} />;
        case "select":
        case "multiselect":
            return <SelectTag {...props} />;
        case "select-radiobuttons":
        case "multiselect-checkboxes":
            return <InputTagSelects {...props} />;
        default: {
            if (valueOrValues instanceof Array) {
                return (
                    <>
                        {valueOrValues.map((...[, i]) => (
                            <InputTag key={i} {...props} fieldIndex={i} />
                        ))}
                    </>
                );
            }

            const inputNode = <InputTag {...props} fieldIndex={undefined} />;

            if (attribute.name === "password" || attribute.name === "password-confirm") {
                return (
                    <PasswordWrapper kcClsx={props.kcClsx} i18n={props.i18n} passwordInputId={attribute.name}>
                        {inputNode}
                    </PasswordWrapper>
                );
            }

            return inputNode;
        }
    }
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    const childElement = children as ReactElement<{ className?: string }>;

    const inputWithPadding = cloneElement(childElement, {
        className: cn(childElement.props.className, "pr-10")
    });

    return (
        <div className={cn(kcClsx("kcInputGroup"), "relative")}>
            {inputWithPadding}
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}

function InputTag(props: InputFieldByTypeProps & { fieldIndex: number | undefined }) {
    const { attribute, fieldIndex, kcClsx, dispatchFormAction, valueOrValues, i18n, displayableErrors } = props;

    const { advancedMsgStr } = i18n;

    const hasError = displayableErrors.find(error => error.fieldIndex === fieldIndex) !== undefined;

    return (
        <>
            <Input
                type={(() => {
                    const { inputType } = attribute.annotations;

                    if (inputType?.startsWith("html5-")) {
                        return inputType.slice(6);
                    }

                    return inputType ?? "text";
                })()}
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    if (fieldIndex !== undefined) {
                        assert(valueOrValues instanceof Array);
                        return valueOrValues[fieldIndex];
                    }

                    assert(typeof valueOrValues === "string");

                    return valueOrValues;
                })()}
                className={cn(kcClsx("kcInputClass"), hasError ? "border-destructive" : undefined)}
                aria-invalid={hasError}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                placeholder={
                    attribute.annotations.inputTypePlaceholder === undefined ? undefined : advancedMsgStr(attribute.annotations.inputTypePlaceholder)
                }
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                max={attribute.annotations.inputTypeMax}
                min={attribute.annotations.inputTypeMin}
                step={attribute.annotations.inputTypeStep}
                {...Object.fromEntries(Object.entries(attribute.html5DataAnnotations ?? {}).map(([key, value]) => [`data-${key}`, value]))}
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            if (fieldIndex !== undefined) {
                                assert(valueOrValues instanceof Array);

                                return valueOrValues.map((value, i) => {
                                    if (i === fieldIndex) {
                                        return event.target.value;
                                    }

                                    return value;
                                });
                            }

                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: fieldIndex
                    })
                }
            />
            {(() => {
                if (fieldIndex === undefined) {
                    return null;
                }

                assert(valueOrValues instanceof Array);

                const values = valueOrValues;

                return (
                    <>
                        <FieldErrors attribute={attribute} kcClsx={kcClsx} displayableErrors={displayableErrors} fieldIndex={fieldIndex} />
                        <AddRemoveButtonsMultiValuedAttribute
                            attribute={attribute}
                            values={values}
                            fieldIndex={fieldIndex}
                            dispatchFormAction={dispatchFormAction}
                            i18n={i18n}
                        />
                    </>
                );
            })()}
        </>
    );
}

function AddRemoveButtonsMultiValuedAttribute(props: {
    attribute: Attribute;
    values: string[];
    fieldIndex: number;
    dispatchFormAction: React.Dispatch<Extract<FormAction, { action: "update" }>>;
    i18n: I18n;
}) {
    const { attribute, values, fieldIndex, dispatchFormAction, i18n } = props;

    const { msg } = i18n;

    const { hasAdd, hasRemove } = getButtonToDisplayForMultivaluedAttributeField({ attribute, values, fieldIndex });

    const idPostfix = `-${attribute.name}-${fieldIndex + 1}`;

    if (!hasAdd && !hasRemove) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            {hasRemove && (
                <Button
                    id={`kc-remove${idPostfix}`}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto px-2 font-normal"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: values.filter((_, i) => i !== fieldIndex)
                        })
                    }
                >
                    {msg("remove")}
                </Button>
            )}
            {hasAdd && (
                <Button
                    id={`kc-add${idPostfix}`}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto px-2 font-normal"
                    onClick={() =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: [...values, ""]
                        })
                    }
                >
                    {msg("addValue")}
                </Button>
            )}
        </div>
    );
}

function InputTagSelects(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, i18n, valueOrValues, displayableErrors } = props;

    const { inputType } = attribute.annotations;

    assert(inputType === "select-radiobuttons" || inputType === "multiselect-checkboxes");

    const classNames = (() => {
        switch (inputType) {
            case "select-radiobuttons":
                return {
                    wrapper: kcClsx("kcInputClassRadio"),
                    control: kcClsx("kcInputClassRadioInput"),
                    label: kcClsx("kcInputClassRadioLabel"),
                    labelDisabled: kcClsx("kcInputClassRadioCheckboxLabelDisabled")
                };
            case "multiselect-checkboxes":
                return {
                    wrapper: kcClsx("kcInputClassCheckbox"),
                    control: kcClsx("kcInputClassCheckboxInput"),
                    label: kcClsx("kcInputClassCheckboxLabel"),
                    labelDisabled: kcClsx("kcInputClassRadioCheckboxLabelDisabled")
                };
        }
    })();

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    if (inputType === "select-radiobuttons") {
        assert(!(valueOrValues instanceof Array));

        const currentValue = typeof valueOrValues === "string" ? valueOrValues : "";

        return (
            <>
                <RadioGroup
                    name={attribute.name}
                    value={currentValue}
                    onValueChange={value =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: value
                        })
                    }
                    onBlur={() =>
                        dispatchFormAction({
                            action: "focus lost",
                            name: attribute.name,
                            fieldIndex: undefined
                        })
                    }
                    aria-invalid={displayableErrors.length !== 0}
                    data-invalid={displayableErrors.length !== 0 ? true : undefined}
                    className={cn("space-y-2", classNames?.wrapper)}
                >
                    {options.map(option => {
                        const optionId = `${attribute.name}-${option}`;
                        return (
                            <div key={option} className="flex items-center gap-2">
                                <RadioGroupItem
                                    id={optionId}
                                    value={option}
                                    disabled={attribute.readOnly}
                                    className={classNames?.control}
                                />
                                <Label
                                    htmlFor={optionId}
                                    className={cn("text-sm", classNames?.label, attribute.readOnly ? classNames?.labelDisabled : undefined)}
                                >
                                    {inputLabel(i18n, attribute, option)}
                                </Label>
                            </div>
                        );
                    })}
                </RadioGroup>
                <input type="hidden" name={attribute.name} value={currentValue} />
            </>
        );
    }

    assert(valueOrValues instanceof Array);

    const values = valueOrValues;

    return (
        <>
            {options.map(option => {
                const optionId = `${attribute.name}-${option}`;
                const isSelected = values.includes(option);
                return (
                    <div key={option} className={cn("flex items-center gap-2", classNames?.wrapper)}>
                        <Checkbox
                            id={optionId}
                            checked={isSelected}
                            disabled={attribute.readOnly}
                            aria-invalid={displayableErrors.length !== 0}
                            className={classNames?.control}
                            onCheckedChange={checked =>
                                dispatchFormAction({
                                    action: "update",
                                    name: attribute.name,
                                    valueOrValues: (() => {
                                        const newValues = [...values];

                                        if (checked === true) {
                                            if (!newValues.includes(option)) {
                                                newValues.push(option);
                                            }
                                            return newValues;
                                        }

                                        return newValues.filter(value => value !== option);
                                    })()
                                })
                            }
                            onBlur={() =>
                                dispatchFormAction({
                                    action: "focus lost",
                                    name: attribute.name,
                                    fieldIndex: undefined
                                })
                            }
                        />
                        <Label
                            htmlFor={optionId}
                            className={cn("text-sm", classNames?.label, attribute.readOnly ? classNames?.labelDisabled : undefined)}
                        >
                            {inputLabel(i18n, attribute, option)}
                        </Label>
                        {isSelected && <input type="hidden" name={attribute.name} value={option} />}
                    </div>
                );
            })}
            {values.length === 0 && <input type="hidden" name={attribute.name} value="" />}
        </>
    );
}

function TextareaTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, valueOrValues } = props;

    assert(typeof valueOrValues === "string");

    const value = valueOrValues;
    const hasError = displayableErrors.length !== 0;

    return (
        <Textarea
            id={attribute.name}
            name={attribute.name}
            className={cn(kcClsx("kcInputClass"), hasError ? "border-destructive" : undefined)}
            aria-invalid={hasError}
            disabled={attribute.readOnly}
            cols={attribute.annotations.inputTypeCols === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeCols}`)}
            rows={attribute.annotations.inputTypeRows === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeRows}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            value={value}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: event.target.value
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}

function SelectTag(props: InputFieldByTypeProps) {
    const { attribute, dispatchFormAction, kcClsx, displayableErrors, i18n, valueOrValues } = props;

    const isMultiple = attribute.annotations.inputType === "multiselect";
    const hasError = displayableErrors.length !== 0;
    const [isSingleSelectOpen, setIsSingleSelectOpen] = useState(false);
    const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
    const singleOpenRef = useRef(false);
    const multiOpenRef = useRef(false);

    useEffect(() => {
        if (isMultiple) {
            if (multiOpenRef.current && !isMultiSelectOpen) {
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                });
            }

            multiOpenRef.current = isMultiSelectOpen;
            return;
        }

        if (singleOpenRef.current && !isSingleSelectOpen) {
            dispatchFormAction({
                action: "focus lost",
                name: attribute.name,
                fieldIndex: undefined
            });
        }

        singleOpenRef.current = isSingleSelectOpen;
    }, [attribute.name, dispatchFormAction, isMultiple, isMultiSelectOpen, isSingleSelectOpen]);

    const options = (() => {
        walk: {
            const { inputOptionsFromValidation } = attribute.annotations;

            if (inputOptionsFromValidation === undefined) {
                break walk;
            }

            assert(typeof inputOptionsFromValidation === "string");

            const validator = (attribute.validators as Record<string, { options?: string[] }>)[inputOptionsFromValidation];

            if (validator === undefined) {
                break walk;
            }

            if (validator.options === undefined) {
                break walk;
            }

            return validator.options;
        }

        return attribute.validators.options?.options ?? [];
    })();

    if (!isMultiple) {
        assert(typeof valueOrValues === "string");

        const currentValue = valueOrValues;

        return (
            <>
                <ShadcnSelect
                    name={attribute.name}
                    value={currentValue}
                    disabled={attribute.readOnly}
                    onOpenChange={setIsSingleSelectOpen}
                    onValueChange={value =>
                        dispatchFormAction({
                            action: "update",
                            name: attribute.name,
                            valueOrValues: value
                        })
                    }
                >
                    <SelectTrigger
                        id={attribute.name}
                        aria-invalid={hasError}
                        data-invalid={hasError ? true : undefined}
                        className={cn(kcClsx("kcInputClass"), "justify-between", hasError ? "border-destructive" : undefined)}
                    >
                        <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {options.map(option => (
                            <SelectItem key={option} value={option}>
                                {inputLabel(i18n, attribute, option)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </ShadcnSelect>
                <input type="hidden" name={attribute.name} value={currentValue} />
            </>
        );
    }

    assert(valueOrValues instanceof Array);

    const selectedValues = valueOrValues;

    const checkboxLabelClass = kcClsx("kcInputClassCheckboxLabel");
    const checkboxLabelDisabledClass = kcClsx("kcInputClassRadioCheckboxLabelDisabled");
    const checkboxInputClass = kcClsx("kcInputClassCheckboxInput");

    return (
        <>
            <Popover open={isMultiSelectOpen} onOpenChange={setIsMultiSelectOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        id={attribute.name}
                        variant="outline"
                        className={cn(kcClsx("kcInputClass"), "justify-between text-left", hasError ? "border-destructive" : undefined)}
                        aria-invalid={hasError}
                        data-invalid={hasError ? true : undefined}
                        disabled={attribute.readOnly}
                    >
                        <span className="flex flex-wrap items-center gap-1">
                            {selectedValues.length > 0 ? (
                                selectedValues.map((option, index) => (
                                    <Fragment key={option}>
                                        {index > 0 && <span>,</span>}
                                        {inputLabel(i18n, attribute, option)}
                                    </Fragment>
                                ))
                            ) : (
                                "Select"
                            )}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full space-y-2 p-3" align="start">
                    {options.map(option => {
                        const optionId = `${attribute.name}-${option}`;
                        const isChecked = selectedValues.includes(option);
                        return (
                            <div key={option} className="flex items-center gap-2">
                                <Checkbox
                                    id={optionId}
                                    checked={isChecked}
                                    disabled={attribute.readOnly}
                                    aria-invalid={displayableErrors.length !== 0}
                                    className={checkboxInputClass}
                                    onCheckedChange={checked =>
                                        dispatchFormAction({
                                            action: "update",
                                            name: attribute.name,
                                            valueOrValues: (() => {
                                                const nextValues = [...selectedValues];

                                                if (checked === true) {
                                                    if (!nextValues.includes(option)) {
                                                        nextValues.push(option);
                                                    }
                                                    return nextValues;
                                                }

                                                return nextValues.filter(value => value !== option);
                                            })()
                                        })
                                    }
                                />
                                <Label
                                    htmlFor={optionId}
                                    className={cn("text-sm", checkboxLabelClass, attribute.readOnly ? checkboxLabelDisabledClass : undefined)}
                                >
                                    {inputLabel(i18n, attribute, option)}
                                </Label>
                            </div>
                        );
                    })}
                </PopoverContent>
            </Popover>
            {selectedValues.length === 0 && <input type="hidden" name={attribute.name} value="" />}
            {selectedValues.map(value => (
                <input key={value} type="hidden" name={attribute.name} value={value} />
            ))}
        </>
    );
}

function inputLabel(i18n: I18n, attribute: Attribute, option: string) {
    const { advancedMsg } = i18n;

    if (attribute.annotations.inputOptionLabels !== undefined) {
        const { inputOptionLabels } = attribute.annotations;

        return advancedMsg(inputOptionLabels[option] ?? option);
    }

    if (attribute.annotations.inputOptionLabelsI18nPrefix !== undefined) {
        return advancedMsg(`${attribute.annotations.inputOptionLabelsI18nPrefix}.${option}`);
    }

    return option;
}
