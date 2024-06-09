import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FloatingPortal } from "@floating-ui/react";
import { cn } from "../../lib/cn";
import { makeClassName } from "../../lib/make-class-name";
import { dropdownStyles } from "../../lib/dropdown-list-style";
import { useDropdown } from "./dropdown-context";

type DropdownMenuProps = {
  as?: "ul" | "div";
  className?: string;
};

export function DropdownMenu({
  as = "div",
  className,
  children,
}: React.PropsWithChildren<DropdownMenuProps>) {
  const { inPortal, rounded, shadow, refs, strategy, x, y } = useDropdown();
  const TransitionComponent: React.ElementType = Transition;
  const MenuItems: React.ElementType = Menu.Items;

  const PortalComponent = inPortal ? FloatingPortal : Fragment;

  return (
    <PortalComponent>
      <TransitionComponent
        as={Fragment}
        enter="ac-transition ac-ease-out ac-duration-100"
        enterFrom="ac-transform ac-opacity-0 ac-scale-95"
        enterTo="ac-transform ac-opacity-100 ac-scale-100"
        leave="ac-transition ac-ease-in ac-duration-75"
        leaveFrom="ac-transform ac-opacity-100 ac-scale-100"
        leaveTo="ac-transform ac-opacity-0 ac-scale-95"
      >
        <MenuItems
          as={as}
          ref={refs.setFloating}
          data-testid="dropdown-menu"
          className={cn(
            makeClassName(`dropdown-menu`),
            "ac-w-48",
            dropdownStyles.base,
            rounded && dropdownStyles.rounded[rounded],
            shadow && dropdownStyles.shadow[shadow],
            className
          )}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          {children}
        </MenuItems>
      </TransitionComponent>
    </PortalComponent>
  );
}

DropdownMenu.displayName = "DropdownMenu";
