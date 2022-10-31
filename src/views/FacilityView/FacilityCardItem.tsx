import Image from 'next/image';
import { Box, Card, CardActionArea, Grid, Stack, Typography, useTheme } from '@mui/material';
import { IFacility } from '@types';

export interface FacilityCardProps {
  facility: IFacility;
  onClick: (facility: IFacility) => void;
}

export const FacilityCard = ({ facility, onClick }: FacilityCardProps) => {
  const theme = useTheme();
  return (
    <Grid key={facility.id} item xs={12} md={3}>
      <Card key={facility.id}>
        <CardActionArea onClick={() => onClick(facility)}>
          <Stack direction='column' p={2}>
            <Image
              style={{
                borderRadius: 8,
                ...(facility.pictures.length === 0 && { backgroundColor: theme.palette.grey[300] }),
              }}
              src={facility.pictures[0] ?? '/static/images/no-photo.png'}
              alt={facility.name}
              layout='responsive'
              width='100%'
              height='100%'
            />
            <Box mt={5}>
              <Typography variant='subtitle1'>{facility.name}</Typography>
              <Typography variant='body2'>{facility.category.name}</Typography>
            </Box>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
