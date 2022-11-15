import React from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover/Popover";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button/Button";
import { IActionCellButtonProperties } from "./ActionCellButton.interface";
import MoreVert from "@mui/icons-material/MoreVert";
import { Box, Typography } from "@mui/material";

const ActionCellButton: React.FC<IActionCellButtonProperties> = ({ options = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton aria-label="table row action button" disableRipple onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "top",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        PaperProps={{
          style: { minWidth: 140 },
        }}
      >
        <Stack sx={{ padding: 1 }} alignItems="start" justifyContent="start">
          {options.map((dt, index) => (
            <Button
              fullWidth
              style={{ justifyContent: "flex-start" }}
              aria-label={`${dt.label} button`}
              color={dt.color}
              onClick={(e) => {
                dt?.onClick?.(e);
                setAnchorEl(null);
              }}
              key={index}
              startIcon={dt.icon}
            >
              <Box ml={1}>
                <Typography variant="body2"> {dt.label}</Typography>
              </Box>
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default React.memo(ActionCellButton);
