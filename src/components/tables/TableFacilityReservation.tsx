import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { doFetch } from "../../lib/dataFetcher";
import { AlertContext } from "../../provider/AlertProvider";
import { fDateTime } from "../../utils/formatTime";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Popover,
  useTheme,
} from "@mui/material";
import {
  BorderColorOutlined,
  DeleteOutlined,
  MoreVert,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import Label from "../Label";

const createLabel = (status: string) => {
  let color = "default";
  const checkedStatus = status.toLowerCase();

  if (["rejected", "no show", "canceled"].includes(checkedStatus)) {
    color = "error";
  }

  if (checkedStatus === "booked") {
    color = "warning";
  }

  if (checkedStatus === "ongoing") {
    color = "success";
  }

  if (checkedStatus === "requested") {
    color = "info";
  }

  return (
    <Label color={color} variant="ghost">
      {status}
    </Label>
  );
};

const TableFacilityReservation = () => {
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [anchor, setAnchor] = useState<any>(null);

  const { setAlert } = useContext(AlertContext);

  const theme = useTheme();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      doFetch(router.asPath, setData, setAlert, setIsError);
    }
  }, [router, setIsError, setAlert]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setAnchor(e.currentTarget);
  };

  const ActionButton = useMemo(
    () => (
      <Popover
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
      >
        <Box width={150}>
          <Stack sx={{ padding: 1 }} gap={0.5} alignItems="start">
            <Button color="error" startIcon={<DeleteOutlined />}>
              Hapus
            </Button>
            <Button
              sx={{ color: theme.palette.text.primary }}
              startIcon={<BorderColorOutlined />}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </Popover>
    ),
    [anchor, theme]
  );

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Kode Reservasi",
      flex: 1,
    },
    {
      field: "facilityName",
      headerName: "Facility",
      flex: 1,
      valueGetter: (params) => params.row.facility.name,
    },
    {
      field: "slotDate",
      headerName: "Booking Slot",
      flex: 1,
      renderCell: (params) => fDateTime(params.row.slot_date),
    },
    {
      field: "bookingDuration",
      headerName: "Duration",
      renderCell: (params) => `${params.row.duration} Minutes`,
    },
    {
      field: "tenantName",
      headerName: "Tenant",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.profile.first_name} ${params.row.profile.last_name}`,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Booking Status",
      flex: 1,
      renderCell: (params) => (
        <Grid container flex={1} justifyContent="center" alignItems="center">
          <Grid item flexGrow={1}>
            {createLabel(params.row.status)}
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <>
      {ActionButton}
      <DataGrid
        autoHeight
        disableColumnSelector
        checkboxSelection
        hideFooterSelectedRowCount
        disableSelectionOnClick
        rows={data?.items || []}
        columns={columns}
      />
    </>
  );
};

export default TableFacilityReservation;
