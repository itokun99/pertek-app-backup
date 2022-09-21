import { Box, useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from '../../provider/SidebarProvider';
import { ListLoader } from '../loader/ListLoader';
import { SidebarRootList } from './SidebarRootList';

export const SidebarContent = () => {
  const { open, menuGroups } = useContext(SidebarContext);
  const theme = useTheme();
  const boxSx = {
    px: open ? 2 : 1,
    color: theme.palette.text.secondary,
  };

  return (
    <Box sx={boxSx}>
      {menuGroups.length > 0 ? (
        menuGroups.map((menuGroup, key) => <SidebarRootList key={key} menuGroup={menuGroup} />)
      ) : (
        <ListLoader />
      )}
    </Box>
  );
};
