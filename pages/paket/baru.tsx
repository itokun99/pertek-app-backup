import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import ProtectedPage from '@template/ProtectedPage';

const PengumumanBaru = () => {
  return <Typography>Tambah Pengumuman</Typography>;
};

PengumumanBaru.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default PengumumanBaru;
