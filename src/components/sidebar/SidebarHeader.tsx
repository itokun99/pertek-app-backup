import KeyboardDoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { PropsWithChildren, useContext } from 'react';
import { SidebarContext } from '@provider/SidebarProvider';

export type SidebarHeaderProps = PropsWithChildren & {
  buttonColor?: string;
};

const StyledDrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const SidebarHeader = ({ buttonColor, children }: SidebarHeaderProps) => {
  const theme = useTheme();

  const { open, setOpen, activeProperty } = useContext(SidebarContext);

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
            {children}
          </Typography>
        </Box>
      )}
      <IconButton onClick={() => setOpen(!open)} aria-label='sidebar toggle button'>
        {icon}
      </IconButton>
    </StyledDrawerHeader>
  );
};
