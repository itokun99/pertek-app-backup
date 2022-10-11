import { Tab, Tabs, Theme, Typography } from "@mui/material";
import { PropsWithChildren, SyntheticEvent } from "react";

type TabBarProps = PropsWithChildren & {
  theme: Theme;
  value: number;
  tabs: string[];
  onChange?: (e: SyntheticEvent<Element, Event>, value: number) => void;
};
export const TabBar = ({ theme, tabs, value, onChange }: TabBarProps) => {
  return (
    <Tabs
      sx={{
        paddingX: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        display: "flex",
      }}
      value={value}
      onChange={onChange}
    >
      {tabs.map((tab, key) => (
        <Tab
          key={key}
          id={`tenant-table-tab-${key}`}
          disableRipple
          label={<Typography variant="subtitle2">{tab}</Typography>}
        />
      ))}
    </Tabs>
  );
};
