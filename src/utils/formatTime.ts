import { format, getTime, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(date: string) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: string) {
  return format(new Date(date), 'dd MMM yyyy p');
}

export function fTimestamp(date: string) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: string) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  });
}
