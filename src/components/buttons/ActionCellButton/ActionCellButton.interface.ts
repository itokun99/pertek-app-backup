export type ButtonAccentProperties =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface IActionCellButtonProperties {
  options: {
    label: string;
    icon?: React.ReactNode;
    color?: ButtonAccentProperties;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
}
