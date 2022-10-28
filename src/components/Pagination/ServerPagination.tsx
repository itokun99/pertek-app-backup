/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';

const ServerPagination: React.FC<{ total: number }> = ({ total = 0 }) => {
  const router = useRouter();
  const { pathname, query } = router;

  const [page, setPage] = useState(() => Number(query.page || 0));
  const [limit, setLimit] = useState(() => Number(query.limit) || 10);
  const initialRender = useRef<boolean>(false);

  const onChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(0);
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    if (initialRender.current) {
      router.push({
        pathname,
        query: {
          ...query,
          page: page !== 0 ? page : undefined,
          limit,
        },
      });
    }
    initialRender.current = true;
  }, [page, limit]);

  return (
    <Stack spacing={2}>
      <TablePagination
        width='100%'
        count={total}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onPageChange={onChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default ServerPagination;
