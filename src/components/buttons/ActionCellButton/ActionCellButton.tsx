import React from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover/Popover';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button/Button';
import { IActionCellButtonProperties } from './ActionCellButton.interface';
import MoreVert from '@mui/icons-material/MoreVert';

const ActionCellButton: React.FC<IActionCellButtonProperties> = ({ options = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton disableRipple onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        PaperProps={{
          style: { width: 120 },
        }}
        className='action-cell-button'
      >
        <Stack sx={{ padding: 1 }}>
          {options.map((dt, index) => (
            <Button
              color={dt.color}
              onClick={(e) => {
                dt?.onClick?.(e);
                setAnchorEl(null);
              }}
              key={index}
            >
              <div className='action-cell-button'>
                {dt.icon}
                <span className='action-cell-button__text'>{dt.label}</span>
              </div>
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default React.memo(ActionCellButton);
