import { Stack, Tab, Tabs, Theme, Typography } from '@mui/material';
import { PropsWithChildren, SyntheticEvent } from 'react';
import Label from '../components/Label';

export type TabItem = {
  label?: string;
  text: string;
  color: 'success' | 'warning' | 'info' | 'error' | 'default';
};

type TabBarProps = PropsWithChildren & {
  theme: Theme;
  value: number;
  tabs: TabItem[];
  onChange?: (e: SyntheticEvent<Element, Event>, value: number) => void;
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
