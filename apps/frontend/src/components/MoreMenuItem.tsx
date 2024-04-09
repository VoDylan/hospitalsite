import React, {
  KeyboardEventHandler,
  useRef,
  useState,
  useCallback,
  useId,
  FC,
} from "react";
import { MenuItemProps, MenuItem, Menu, MenuProps } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type MoreMenuItemProps = {
  button?: true;
  label: string;
  MenuProps?: Omit<MenuProps, "open" | "onClose" | "anchorEl" | "onKeyDown">;
} & Omit<MenuItemProps, "onKeyDown" | "onMouseEnter" | "onMouseLeave">;

const MoreMenuItem: FC<MoreMenuItemProps> = ({
  label,
  children,
  id,
  MenuProps,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const menuItemRef = useRef<HTMLLIElement>(null);
  const menuItemId = useId();
  const normMenuItemId = id ?? menuItemId;

  const handleItemKeyDown: KeyboardEventHandler<HTMLLIElement> = (ev) => {
    if (
      (ev.key !== "ArrowRight" && ev.key !== "Enter") ||
      ev.ctrlKey ||
      ev.shiftKey ||
      ev.altKey ||
      ev.metaKey
    )
      return;
    ev.preventDefault();
    ev.stopPropagation();
    setIsOpen(true);
  };

  const handleMenuKeyDown: KeyboardEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation();
    if (
      (ev.key !== "ArrowLeft" && ev.key !== "Escape") ||
      ev.ctrlKey ||
      ev.shiftKey ||
      ev.altKey ||
      ev.metaKey
    )
      return;
    ev.preventDefault();
    setIsOpen(false);
  };

  return (
    <MenuItem
      {...other}
      onKeyDown={handleItemKeyDown}
      ref={menuItemRef}
      sx={[
        { justifyContent: "space-between" },
        isOpen && { backgroundColor: "action.hover" },
      ]}
      onMouseEnter={open}
      onMouseLeave={close}
      id={normMenuItemId}
    >
      <span>{label}</span>
      <NavigateNextIcon sx={{ fontSize: "1.2rem" }} />
      <Menu
        TransitionProps={{ onExited: () => menuItemRef.current?.focus() }}
        disableRestoreFocus
        onKeyDown={handleMenuKeyDown}
        sx={{
          pointerEvents: "none",
          "& .MuiList-root": {
            pointerEvents: "auto",
          },
        }}
        MenuListProps={{
          ...MenuProps?.MenuListProps,
          "aria-labelledby": normMenuItemId,
        }}
        anchorEl={menuItemRef.current}
        open={isOpen}
        onClose={close}
        anchorOrigin={
          MenuProps?.anchorOrigin ?? { vertical: "center", horizontal: "right" }
        }
        transformOrigin={
          MenuProps?.transformOrigin ?? {
            vertical: "center",
            horizontal: "left",
          }
        }
      >
        {children}
      </Menu>
    </MenuItem>
  );
};

export default MoreMenuItem;
