import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { doFetch } from "../../lib/dataFetcher";
import { AlertContext } from "../../provider/AlertProvider";
import { fDateTime } from "../../utils/formatTime";
import Label from "../../components/Label";
import { Button, Grid, IconButton, Popover } from "@mui/material";
import { DeleteOutlined, MoreVert } from "@mui/icons-material";
import { padding, Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";

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
        <Stack sx={{ padding: 1 }}>
          <Button startIcon={<DeleteOutlined />}>Hapus</Button>
          <Button startIcon={<DeleteOutlined />}>Hapus</Button>
          <Grid container flexGrow={1}>
            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>
        </Stack>
      </Popover>
    ),
    [anchor]
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
      renderCell: (params) => {
        return fDateTime(params.row.slot_date);
      },
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
            <IconButton disableRipple onClick={handleClick}>
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
