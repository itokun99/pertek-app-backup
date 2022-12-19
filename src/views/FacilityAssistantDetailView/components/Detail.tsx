import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { IFacilityAssistant } from "@general-types";

interface IDetailViewProps {
  assistant: IFacilityAssistant;
}

const DetailView = ({ assistant }: IDetailViewProps) => {
  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={12} mx={2}>
        <Grid container spacing={3} flex={1}>
          <Grid item xs={12} md={3}>
            <Image
              style={{
                borderRadius: 16,
                ...(assistant?.contact.profile_picture && {
                  backgroundColor: theme.palette.grey[300],
                }),
              }}
              width="100%"
              height="100%"
              src={assistant.contact.profile_picture || "/static/images/no-photo.png"}
              alt={assistant.contact.first_name}
              layout="responsive"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {assistant?.contact.first_name} {assistant?.contact.last_name}
                </Typography>
                <Typography variant="h5">{assistant.staff_code}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Stack direction="column" spacing={2} mr={2}>
                    <Typography variant="subtitle1">No. Identitas</Typography>
                    <Typography variant="subtitle1">Kategori Fasilitas</Typography>
                  </Stack>
                  <Stack direction="column" spacing={2}>
                    <Typography variant="body1">
                      {assistant?.contact.identity_type
                        ? `${assistant?.contact.identity_type} - ${assistant?.contact.identity}`
                        : "-"}
                    </Typography>
                    <Typography variant="body1">{assistant?.facility_category.name}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DetailView);
