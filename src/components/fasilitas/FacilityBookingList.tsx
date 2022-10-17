import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { ChangeEventHandler, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { doFetch } from '../../lib/dataFetcher';
import { AlertContext } from '../../provider/AlertProvider';
import { fDateTime } from '../../utils/formatTime';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Popover,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  useTheme,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import { BorderColorOutlined, DeleteOutlined, Search, MoreVert } from '@mui/icons-material';
import { Stack } from '@mui/system';
import Label from '../Label';
import { SearchField } from '../SearchField';
import { DropdownSelect } from '../DropdownSelect';

const createLabel = (status: string) => {
  let color = 'default';
  const checkedStatus = status.toLowerCase();

  if (['rejected', 'no show', 'canceled'].includes(checkedStatus)) {
    color = 'error';
  }

  if (checkedStatus === 'booked') {
    color = 'warning';
  }

  if (checkedStatus === 'ongoing') {
    color = 'success';
  }

  if (checkedStatus === 'requested') {
    color = 'info';
  }

  return (
    <Label color={color} variant='ghost'>
      {status}
    </Label>
  );
};

const FacilityBookingList = () => {
  const [booking, setBooking] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [anchor, setAnchor] = useState<any>(null);
  const [categories, setCategories] = useState<[] | null>(null);
  const [venues, setVenues] = useState<[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedVenue, setSelectedVenue] = useState<number | undefined>();

  const { setAlert } = useContext(AlertContext);

  const theme = useTheme();

  const router = useRouter();

  const fetchFacilityBooking = useCallback(
    () => doFetch('/api/fasilitas/booking', setBooking, setAlert, setIsError),
    [setAlert]
  );

  const fetchFacilityCategory = useCallback(async () => {
    const res = await fetch('/api/fasilitas/category');
    if (res.ok) {
      const payload = await res.json();
      setCategories(payload.items);
    }
  }, []);

  const fetchFacility = useCallback(async () => {
    const res = await fetch('/api/fasilitas');
    if (res.ok) {
      const payload = await res.json();
      setVenues(payload.items);
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const categoryId = parseInt(router.query.category_id as string);
      const venueId = parseInt(router.query.facility_id as string);

      fetchFacilityBooking();
      fetchFacilityCategory();
      fetchFacility();
      setSelectedCategory((!isNaN(categoryId) && categoryId) || 0);
      setSelectedVenue((!isNaN(venueId) && venueId) || 0);
    }
  }, [
    fetchFacility,
    fetchFacilityBooking,
    fetchFacilityCategory,
    router.isReady,
    router.query.category_id,
    router.query.facility_id,
  ]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setAnchor(e.currentTarget);
  };

  useEffect(() => {
    if (router.isReady) {
      if (selectedCategory === 0) {
        delete router.query.category_id;
      } else {
        router.query.category_id = selectedCategory?.toString();
      }
      router.push({
        pathname: router.pathname,
        query: router.query,
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (router.isReady) {
      if (selectedVenue === 0) {
        delete router.query.facility_id;
      } else {
        router.query.facility_id = selectedVenue?.toString();
      }

      router.push({
        pathname: router.pathname,
        query: router.query,
      });
    }
  }, [selectedVenue]);

  const handleCategoryChange = useCallback((e: SelectChangeEvent<unknown>, node: ReactNode) => {
    setSelectedCategory(e.target.value as number);
  }, []);

  const handleVenueChange = useCallback((e: SelectChangeEvent<unknown>, node: ReactNode) => {
    setSelectedVenue(e.target.value as number);
  }, []);

  const handleSearch = () => {};

  const ActionButton = useMemo(
    () => (
      <Popover
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
      >
        <Box width={150}>
          <Stack sx={{ padding: 1 }} gap={0.5} alignItems='start'>
            <Button color='error' startIcon={<DeleteOutlined />}>
              Hapus
            </Button>
            <Button sx={{ color: theme.palette.text.primary }} startIcon={<BorderColorOutlined />}>
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
      field: 'code',
      headerName: 'Kode Reservasi',
      flex: 1,
    },
    {
      field: 'facilityName',
      headerName: 'Facility',
      flex: 1,
      valueGetter: (params) => params.row.facility.name,
    },
    {
      field: 'slotDate',
      headerName: 'Booking Slot',
      flex: 1,
      renderCell: (params) => fDateTime(params.row.slot_date),
    },
    {
      field: 'bookingDuration',
      headerName: 'Duration',
      renderCell: (params) => `${params.row.duration} Minutes`,
    },
    {
      field: 'tenantName',
      headerName: 'Tenant',
      flex: 1,
      valueGetter: (params) => `${params.row.profile.first_name} ${params.row.profile.last_name}`,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Booking Status',
      flex: 1,
      renderCell: (params) => (
        <Grid container flex={1} justifyContent='center' alignItems='center'>
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

  const FacilityCategoryFilter = useMemo(() => {
    return (
      <DropdownSelect
        label='Facility'
        labelId='facility-filter-id'
        items={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
    );
  }, [categories, selectedCategory, handleCategoryChange]);

  const FacilityVenueFilter = useMemo(() => {
    return (
      <DropdownSelect
        label='Venue'
        labelId='facility-venue-filter-id'
        items={venues}
        value={selectedVenue}
        onChange={handleVenueChange}
      />
    );
  }, [venues, selectedVenue, handleVenueChange]);

  const Search = useMemo(() => {
    return <SearchField onChange={handleSearch} placeholder='Search for booking...' />;
  }, []);

  return (
    <>
      {ActionButton}
      <Stack gap={2}>
        <Stack mt={2} mx={0.5} gap={2} direction='row'>
          {FacilityCategoryFilter}
          {FacilityVenueFilter}
          {Search}
        </Stack>
        <DataGrid
          autoHeight
          disableColumnSelector
          checkboxSelection
          hideFooterSelectedRowCount
          disableSelectionOnClick
          rows={booking?.items || []}
          columns={columns}
        />
      </Stack>
    </>
  );
};

export default FacilityBookingList;
