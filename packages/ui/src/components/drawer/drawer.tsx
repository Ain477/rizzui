import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cn } from "../../lib/cn";
import { makeClassName } from "../../lib/make-class-name";

const drawerClasses = {
  overlay:
    "ac-fixed ac-inset-0 ac-cursor-pointer ac-bg-black ac-bg-opacity-60 ac-transition-opacity dark:ac-bg-opacity-80",
  placement: {
    top: "-ac-translate-y-full",
    right: "ac-translate-x-full",
    bottom: "ac-translate-y-full",
    left: "-ac-translate-x-full",
  },
  // -> when placement is set to top | bottom
  sizeOfYAxisDrawer: {
    sm: "ac-max-h-[30%]",
    md: "ac-max-h-[35%]",
    lg: "ac-max-h-[60%]",
    xl: "ac-max-h-[80%]",
    full: "ac-max-h-full",
  },
  // -> when placement is set to left | right
  sizeOfXAxisDrawer: {
    sm: "ac-max-w-sm",
    md: "ac-max-w-md",
    lg: "ac-max-w-2xl",
    xl: "ac-max-w-[60%]",
    full: "ac-max-w-full",
  },
};

const CHECK_VALID_CUSTOM_SIZE = /(\d*px)|(\d*%)?/g;

function isPlacementOnYAxis(placement: keyof typeof drawerClasses.placement) {
  return ["top", "bottom"].indexOf(placement) !== -1;
}

export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export type DrawerProps = {
  /** Whether the Drawer is open or not */
  isOpen: boolean;
  /** Called when drawer is closed (Escape key and click outside, depending on options) */
  onClose(): void;
  /** Drawer can be placed on left (default), top, right and bottom. Control drawer position with placement prop: */
  placement?: keyof typeof drawerClasses.placement;
  /** Preset size of drawer is sm, md, lg, xl, full */
  size?: DrawerSize;
  /** Size prop will not work when you are using customSize prop. Here is the example of using this prop -> customSize="500px" or customSize="90%" */
  customSize?: string;
  /** Override default CSS style of Drawer's overlay */
  overlayClassName?: string;
  /** Set custom style classes for the Drawer container, where you can set custom Drawer size and padding and background color */
  containerClassName?: string;
  /** Set custom style classes for the Drawer root element */
  className?: string;
};

/**
 * Display overlay area at any side of the screen
 */
export function Drawer({
  isOpen,
  onClose,
  size = "md",
  placement = "right",
  customSize,
  overlayClassName,
  containerClassName,
  className,
  children,
}: React.PropsWithChildren<DrawerProps>) {
  const TransitionComponent: React.ElementType = Transition;
  const TransitionChild: React.ElementType = Transition.Child;
  // checking customSize value
  if (customSize?.match(CHECK_VALID_CUSTOM_SIZE)) {
    const checkedCustomSizeValue =
      customSize?.match(CHECK_VALID_CUSTOM_SIZE) ?? [];
    if (checkedCustomSizeValue[0] === "") {
      console.warn(
        'customSize prop value is not valid. Please set customSize prop like -> customSize="500px" or customSize="50%"'
      );
    }
  }
  return (
    <TransitionComponent appear show={isOpen} as={Fragment}>
      <Dialog
        as="aside"
        onClose={onClose}
        className={cn(
          makeClassName(`drawer-root`),
          "ac-fixed ac-inset-0 ac-z-[999] ac-overflow-hidden",
          className
        )}
      >
        <TransitionChild
          as={Fragment}
          enter="ac-ease-in-out ac-duration-300"
          enterFrom="ac-opacity-0"
          enterTo="ac-opacity-100"
          leave="ac-ease-in-out ac-duration-300"
          leaveFrom="ac-opacity-100"
          leaveTo="ac-opacity-0"
        >
          <Dialog.Overlay
            className={cn(
              makeClassName(`drawer-overlay`),
              drawerClasses.overlay,
              overlayClassName
            )}
          />
        </TransitionChild>
        {/*
          -> Please do not remove this Sr Only button.
          -> It's required this button to tackle the HeadlessUI's FocusTap Warnings
        */}
        <button type="button" className="ac-sr-only">
          Sr Only
        </button>
        <TransitionChild
          as={Fragment}
          enter="ac-transform ac-transition ac-ease-in-out ac-duration-300"
          enterFrom={drawerClasses.placement[placement]}
          enterTo={
            isPlacementOnYAxis(placement)
              ? "ac-translate-y-0"
              : "ac-translate-x-0"
          }
          leave="ac-transform ac-transition ac-ease-in-out ac-duration-300"
          leaveFrom={
            isPlacementOnYAxis(placement)
              ? "ac-translate-y-0"
              : "ac-translate-x-0"
          }
          leaveTo={drawerClasses.placement[placement]}
        >
          <div
            className={cn(
              makeClassName(`drawer-container`),
              "ac-fixed ac-h-full ac-w-full ac-break-words ac-bg-background ac-shadow-xl",
              placement === "top" && "ac-top-0",
              placement === "right" && "ac-inset-y-0 ac-right-0",
              placement === "bottom" && "ac-bottom-0",
              placement === "left" && "ac-inset-y-0 ac-left-0",
              !customSize && [
                isPlacementOnYAxis(placement)
                  ? drawerClasses.sizeOfYAxisDrawer[size]
                  : drawerClasses.sizeOfXAxisDrawer[size],
              ],
              containerClassName
            )}
            {...(customSize && {
              style: {
                maxHeight: isPlacementOnYAxis(placement)
                  ? customSize
                  : "ac-inherit",
                maxWidth: !isPlacementOnYAxis(placement)
                  ? customSize
                  : "ac-inherit",
              },
            })}
          >
            {children}
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionComponent>
  );
}

Drawer.displayName = "Drawer";
