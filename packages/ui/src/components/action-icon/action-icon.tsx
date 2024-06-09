import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { makeClassName } from "../../lib/make-class-name";
import { SpinnerIcon } from "../../icons/spinner";
import { buttonVariantStyles } from "../../lib/button-variant";

const actionIconStyles = {
  base: "ac-inline-flex ac-items-center ac-justify-center active:enabled:ac-translate-y-px focus:ac-outline-none focus-visible:ac-ring-[1.8px] ac-focus-visible:ac-ring-offset-2 ac-ring-offset-background ac-transition-colors ac-duration-200",
  disabled:
    "dark:hover:ac-bg-muted/70 ac-cursor-not-allowed ac-border-muted ac-bg-muted/70 ac-text-muted-foreground ac-backdrop-blur-xl hover:ac-border-muted hover:ac-bg-muted/70",
  size: {
    sm: "ac-p-0.5 ac-w-7 ac-h-7",
    md: "ac-p-1 ac-w-9 ac-h-9",
    lg: "ac-p-2 ac-w-11 ac-h-11",
    xl: "ac-p-2 ac-w-12 ac-h-12",
  },
  rounded: {
    none: "ac-rounded-none",
    sm: "ac-rounded-sm",
    md: "ac-rounded",
    lg: "ac-rounded-md",
    full: "ac-rounded-full",
  },
  spinnerSize: {
    sm: "ac-w-3.5",
    md: "ac-w-4",
    lg: "ac-w-5",
    xl: "ac-w-6",
  },
  variant: buttonVariantStyles,
};

export type ActionIconProps = {
  as?: "button" | "span";
  /** Set the original html type of button */
  type?: "button" | "submit" | "reset";
  /** Use SVG icon as a children */
  children: React.ReactNode;
  /** Set the loading status of button */
  isLoading?: boolean;
  /** The variants of the component are: */
  variant?: keyof typeof actionIconStyles.variant;
  /** The size of the component. `"sm"` is equivalent to the dense button styling. */
  size?: keyof typeof actionIconStyles.size;
  /** The rounded variants are: */
  rounded?: keyof typeof actionIconStyles.rounded;
  /** Change button color */
  color?: keyof (typeof actionIconStyles.variant)["solid"]["color"];
  /** Add custom actionIconStyles for extra style */
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLSpanElement>;

/**
 * Primary action icon button to trigger an operation. Here is the API documentation of the ActionIcon component.
 * And the rest of the props are the same as the original html button.
 * You can use props like `id`, `title`, `onClick`, `onFocus`, `onBlur` etc.
 */
export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      as = "button",
      type = "button",
      children,
      className,
      isLoading,
      variant = "solid",
      size = "md",
      rounded = "md",
      color = "primary",
      disabled,
      ...actionIconProps
    },
    ref
  ) => {
    const Component = as;
    const variantStyle = actionIconStyles.variant[variant];
    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={cn(
          makeClassName(`action-icon-root`),
          actionIconStyles.base,
          actionIconStyles.size[size],
          actionIconStyles.rounded[rounded],
          variantStyle.base,
          variantStyle.color[color],
          isLoading && "ac-pointer-events-none ac-relative",
          disabled && actionIconStyles.disabled,
          className
        )}
        {...(as && as !== "span" && { type })}
        {...actionIconProps}
      >
        {isLoading ? (
          <SpinnerIcon
            className={cn(
              makeClassName(`action-icon-spinner`),
              "ac-h-auto ac-animate-spin",
              actionIconStyles.spinnerSize[size]
            )}
          />
        ) : (
          <>{children}</>
        )}
      </Component>
    );
  }
);

ActionIcon.displayName = "ActionIcon";
