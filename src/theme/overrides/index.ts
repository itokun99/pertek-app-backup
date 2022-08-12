//
import Fab from './Fab';
import Card from './Card';
import Chip from './Chip';
import Tabs from './Tabs';
import Menu from './Menu';
import Link from './Link';
import Lists from './List';
import Table from './Table';
import Alert from './Alert';
import Badge from './Badge';
import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Avatar from './Avatar';
import Rating from './Rating';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import DataGrid from './DataGrid';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Progress from './Progress';
import Timeline from './Timeline';
import TreeView from './TreeView';
import Checkbox from './Checkbox';
import Accordion from './Accordion';
import Typography from './Typography';
import Pagination from './Pagination';
import Breadcrumbs from './Breadcrumbs';
import ButtonGroup from './ButtonGroup';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';
import ToggleButton from './ToggleButton';
import ControlLabel from './ControlLabel';
import LoadingButton from './LoadingButton';
import { Theme } from '@mui/material';
import AppBar from './AppBar';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Typography(theme),
    Badge(),
    Paper(theme),
    Card(theme),
    DataGrid(theme),
    Tabs(theme),
    Button(theme),
    CssBaseline(),
    AppBar(theme),
    Chip(theme),
    Input(theme)
  );
}
