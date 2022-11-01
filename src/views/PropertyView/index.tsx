import Section from '@components/views/Section';
import Image from 'next/image';
import { Avatar, Box, Card, CardActionArea, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useProperty } from './hooks/useProperty';

const PropertyView = () => {
  const { properties } = useProperty();
  const theme = useTheme();

  return (
    <Section title='Property' description='Daftar properti Anda'>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
            <Card>
              <CardActionArea>
                <Box p={2}>
                  <Image
                    style={{
                      borderRadius: 8,
                      ...(property.picture === '' && { backgroundColor: theme.palette.grey[300] }),
                    }}
                    src={property.picture === '' ? '/static/images/no-photo.png' : property.picture}
                    alt={property.name}
                    layout='responsive'
                    height={10}
                    width={10}
                  />
                  <Box mt={2}>
                    <Typography variant='subtitle1'>{property.name}</Typography>
                    <Typography variant='subtitle2' color={theme.palette.grey[600]}>
                      {property.address}
                    </Typography>
                  </Box>
                  <Box pt={2}>
                    <Grid container justifyContent='space-between'>
                      <Grid item>
                        <Typography variant='subtitle2'>Cluster</Typography>
                        <Typography variant='h3'>{property.total_cluster}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2'>Unit</Typography>
                        <Typography variant='h3'>{property.total_unit}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default PropertyView;
