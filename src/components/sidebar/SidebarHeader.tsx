import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, IconButton, styled, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { SidebarContext } from '../../provider/SidebarProvider';

export type SidebarHeaderProps = {
  buttonColor?: string;
  title?: string;
};

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const SidebarHeader = ({ buttonColor, title }: SidebarHeaderProps) => {
  const theme = useTheme();

  const { open, setOpen } = useContext(SidebarContext);

  const icon = open ? (
    <KeyboardDoubleArrowLeft sx={{ color: buttonColor }} />
  ) : (
    <KeyboardDoubleArrowRight sx={{ color: buttonColor }} />
  );
  return (
    <StyledDrawerHeader>
      {open && (
        <Box flexGrow={1} sx={{ pl: theme.spacing(2) }}>
          <Typography variant='subtitle1' textTransform='uppercase'>
            {title}
          </Typography>
        </Box>
      )}
      <IconButton onClick={() => setOpen(!open)}>{icon}</IconButton>
    </StyledDrawerHeader>
  );
};
