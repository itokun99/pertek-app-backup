import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

// additional
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BaseDialogForm from "../BaseDialogForm";
import Image from "next/image";

interface IDetailDialogProps {
  visible: boolean;
  loading: boolean;
  dialogTitle: string;
  title: string;
  thumbnail: string;
  datas: { label: string; value: string | React.ReactElement }[];
  onClose: () => void;
}

const DetailDialog: React.FC<IDetailDialogProps> = ({
  dialogTitle,
  title,
  visible,
  thumbnail,
  onClose,
  datas = [],
}) => {
  const theme = useTheme();

  return (
    <BaseDialogForm fullScreen visible={visible} title={dialogTitle} onClose={onClose}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} mx={2}>
          <Grid container spacing={3} flex={1}>
            <Grid item xs={12} md={3}>
              <Image
                style={{
                  borderRadius: 16,
                  ...(thumbnail && {
                    backgroundColor: theme.palette.grey[300],
                  }),
                }}
                width="100%"
                height="100%"
                src={thumbnail || "/static/images/no-photo.png"}
                alt="thumbnail"
                layout="responsive"
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={2} mr={2}>
                      {datas.map(({ label }, index) => {
                        return (
                          <Typography
                            sx={{
                              height: !label ? "24px" : "auto",
                            }}
                            key={`label-${index}`}
                            variant="subtitle1"
                          >
                            {label}
                          </Typography>
                        );
                      })}
                    </Stack>
                    <Stack direction="column" spacing={2}>
                      {datas.map(({ value }, index) => {
                        return (
                          <Typography key={`value-${index}`} variant="body1">
                            {value}
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </BaseDialogForm>
  );
};

export default React.memo(DetailDialog);
