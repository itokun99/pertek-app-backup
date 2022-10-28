import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { PropsWithChildren, SyntheticEvent } from 'react';
import Label from '@components/Label';

export type TabItem<T = unknown> = {
  label?: string;
  text: string;
  color: 'success' | 'warning' | 'info' | 'error' | 'default';
  value?: string | number | T;
  disabled?: boolean;
};

type TabBarProps = PropsWithChildren & {
  theme: Theme;
  value: number | string;
  tabs: TabItem[];
  onChange?: (e: SyntheticEvent<Element, Event>, value: number | string) => void;
};
export const TabBar = ({ theme, tabs, value, onChange }: TabBarProps) => {
  return (
    <Tabs
      sx={{
        paddingX: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
        display: 'flex',
      }}
      value={value}
      onChange={onChange}
    >
      {tabs.map((tab, key) => (
        <Tab
          key={key}
          id={`tenant-table-tab-${key}`}
          disableRipple
          value={tab.value}
          disabled={tab.disabled}
          label={
            <Stack direction='row' gap={0.5}>
              {tab.label && (
                <Label sx={{ fontSize: 13 }} color={tab.color} variant='ghost'>
                  {tab.label}
                </Label>
              )}{' '}
              <Typography variant='subtitle2'>{tab.text}</Typography>
            </Stack>
          }
        />
      ))}
    </Tabs>
  );
};
