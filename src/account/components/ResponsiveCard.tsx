import { forwardRef, type HTMLAttributes } from "react";
import { clsx } from "keycloakify/tools/clsx";

const containerBase =
    "account-responsive-card w-full overflow-hidden rounded-none border-none bg-transparent p-0 shadow-none " +
    "md:rounded-2xl md:border md:border-border/60 md:bg-card md:p-6 md:shadow-sm";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCard(
    { className, ...props },
    ref
) {
    return <div ref={ref} className={clsx(containerBase, className)} {...props} />;
});
Card.displayName = "ResponsiveCard";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCardHeader(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx(
                "flex flex-col space-y-2 px-4 py-4 md:px-0 md:pt-0 md:pb-6",
                className
            )}
            {...props}
        />
    );
});
CardHeader.displayName = "ResponsiveCardHeader";

export const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCardTitle(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx("text-2xl font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    );
});
CardTitle.displayName = "ResponsiveCardTitle";

export const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCardDescription(
    { className, ...props },
    ref
) {
    return (
        <div ref={ref} className={clsx("text-sm text-muted-foreground", className)} {...props} />
    );
});
CardDescription.displayName = "ResponsiveCardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCardContent(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx("px-4 pb-4 md:px-0 md:pb-0 md:pt-0", className)}
            {...props}
        />
    );
});
CardContent.displayName = "ResponsiveCardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ResponsiveCardFooter(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            className={clsx("flex items-center px-4 pb-4 md:px-0 md:pb-0", className)}
            {...props}
        />
    );
});
CardFooter.displayName = "ResponsiveCardFooter";
