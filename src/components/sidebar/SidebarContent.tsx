import { Box, List, ListSubheader as MuiListSubheader, useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from '../../provider/SidebarProvider';
import { SidebarRootList } from './SidebarRootList';

export const SidebarContent = () => {
  const { open, menuGroups } = useContext(SidebarContext);
  const theme = useTheme();
  const boxSx = {
    px: open ? theme.spacing(2) : theme.spacing(1),
    color: theme.palette.text.secondary,
  };

  return (
    <Box sx={boxSx}>
      {menuGroups.map((menuGroup, key) => (
        <SidebarRootList key={key} menuGroup={menuGroup} />
      ))}
    </Box>
  );
};
