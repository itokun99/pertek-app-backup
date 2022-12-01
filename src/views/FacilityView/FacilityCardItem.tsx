import { IActionCellButtonProperties } from "@components/buttons/ActionCellButton/ActionCellButton.interface";
import { Box, Card, CardActionArea, Grid, Stack, Typography, useTheme } from "@mui/material";
import { IFacility } from "@types";
import Image from "next/image";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";
import ActionCellButton from "@components/buttons/ActionCellButton/ActionCellButton";
export interface FacilityCardProps {
  facility: IFacility;
  onClickEdit: (id: number, record: IFacility | null) => void;
  onClickDelete: (id: number) => void;
  onClickDetail: (record: IFacility | null) => void;
}

export const FacilityCard = ({
  facility,
  onClickEdit,
  onClickDelete,
  onClickDetail,
}: FacilityCardProps) => {
  const theme = useTheme();

  const optionActionCell = (record: IFacility | null) => {
    // you can abstract your record interface here
    const { id } = (record as { id: number }) || {};
    const options: IActionCellButtonProperties["options"] = [
      {
        label: "Detail",
        icon: <OpenInFullSharpIcon />,
        color: "inherit",
        onClick: () => onClickDetail(facility),
      },
      {
        label: "Edit",
        icon: <ModeEditOutlineOutlinedIcon />,
        onClick: () => onClickEdit(id, record),
      },
      {
        label: "Delete",
        icon: <DeleteOutlineOutlinedIcon />,
        color: "error",
        onClick: () => onClickDelete(id),
      },
    ];

    return options;
  };

  return (
    <Card key={facility.id}>
      {/* <CardActionArea > */}
      <Stack direction="column" p={2}>
        <Image
          style={{
            borderRadius: 8,
            ...(facility.pictures.length === 0 && { backgroundColor: theme.palette.grey[300] }),
          }}
          src={facility.pictures[0] ?? "/static/images/no-photo.png"}
          alt={facility.name}
          layout="responsive"
          width="100%"
          height="100%"
        />
        <Box mt={5}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="subtitle1">{facility.name}</Typography>
              <Typography variant="body2">{facility.category.name}</Typography>
            </Grid>
            <Grid item xs={1}>
              <ActionCellButton options={optionActionCell(facility)} />;
            </Grid>
          </Grid>
        </Box>
      </Stack>
      {/* </CardActionArea> */}
    </Card>
  );
};
