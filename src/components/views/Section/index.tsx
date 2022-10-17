import { memo } from 'react';

import {
  Box,
  Grid,
  Stack,
  Typography,
  useTheme,
  StackProps
} from "@mui/material";

interface SectionProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode,
  stackProps?: StackProps,
  children?: React.ReactNode
}


const Section = ({ title, description, actionButton, children, stackProps }: SectionProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack {...stackProps}>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {description}
              </Typography>
            </Stack>
          </Grid>
          {actionButton && (
            <Grid item>
              <Stack direction="row" gap={2}>
                {actionButton}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box>
        {children}
      </Box>
    </Stack>

  );
};

export default memo(Section);
