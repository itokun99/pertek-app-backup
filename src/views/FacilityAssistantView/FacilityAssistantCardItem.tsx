import Image from 'next/image';
import { Box, Card, CardActionArea, Grid, Stack, Typography, useTheme } from '@mui/material';
import { IFacilityAssistant } from '@types';

export interface FacilityAssistantCardProps {
  assistant: IFacilityAssistant;
  onClick: (assistant: IFacilityAssistant) => void;
}

export const FacilityAssistantCard = ({ assistant, onClick }: FacilityAssistantCardProps) => {
  const theme = useTheme();

  return (
    <Grid key={assistant.id} item xs={12} md={3}>
      <Card key={assistant.id}>
        <CardActionArea onClick={() => onClick(assistant)}>
          <Stack direction='column' p={2}>
            <Image
              style={{
                borderRadius: 8,
                ...(assistant.profile.profile_picture === '' && { backgroundColor: theme.palette.grey[300] }),
              }}
              src={
                assistant.profile.profile_picture !== ''
                  ? assistant.profile.profile_picture
                  : '/static/images/no-photo.png'
              }
              alt={`${assistant.profile.first_name} ${assistant.profile.last_name}`}
              layout='responsive'
              width='100%'
              height='100%'
            />
            <Box mt={5}>
              <Typography variant='subtitle1'>{`${assistant.profile.first_name} ${assistant.profile.last_name}`}</Typography>
              <Typography variant='body2'>{assistant.facility_category.name}</Typography>
            </Box>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
