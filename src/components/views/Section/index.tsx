import { memo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StackProps } from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ArrowBack from '@mui/icons-material/ArrowBack';
import NextLink from 'next/link';

interface SectionProps {
  title: string;
  description: string;
  actionButton?: React.ReactNode,
  stackProps?: StackProps,
  children?: React.ReactNode,
  backButton?: boolean;
  backUrl?: URL;
  onClickBack?: () => void;
}


const Section = ({ title, description, actionButton, children, stackProps, backButton, backUrl, onClickBack }: SectionProps): JSX.Element => {
  const theme = useTheme();

  const renderBackButton = (): JSX.Element => {
    if (backUrl) {
      return (
        <NextLink href={backUrl} replace>
          <Link href={String(backUrl)}>
            <IconButton>
              <ArrowBack />
            </IconButton>
          </Link>
        </NextLink>
      )
    }

    return (
      <IconButton onClick={onClickBack}>
        <ArrowBack />
      </IconButton>
    )
  }

  return (
    <Stack {...stackProps}>
      <Box mb={5}>
        <Grid container>
          <Grid item flexGrow={1}>
            <Stack direction="row" gap={2}>
              {backButton && (
                <Stack>
                  {renderBackButton()}
                </Stack>
              )}
              <Stack>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  {description}
                </Typography>
              </Stack>
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
