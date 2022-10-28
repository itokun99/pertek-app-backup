import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

const defaultProps = {
  size: '0.08rem',
  type: 'dashed',
};

export type DividerProps = MuiDividerProps & {
  size?: string;
  type?: 'solid' | 'dashed' | 'dotted';
  color?: string;
} & typeof defaultProps;

const Divider = ({ size, type, color }: DividerProps) => {
  const theme = useTheme();
  return <MuiDivider sx={{ borderBottom: `${size} ${type} ${color || theme.palette.grey[500_32]}` }} />;
};

Divider.defaultProps = defaultProps;

export default Divider;
