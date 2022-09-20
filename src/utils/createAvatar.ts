// ----------------------------------------------------------------------

import { ERROR, GRADIENTS, INFO, PRIMARY, SUCCESS, WARNING } from '../theme/palette';

const PRIMARY_NAME = ['A', 'N', 'H', 'L', 'Q', '9', '8'];
const INFO_NAME = ['F', 'G', 'T', 'I', 'J', '1', '2', '3'];
const SUCCESS_NAME = ['K', 'D', 'Y', 'B', 'O', '4', '5'];
const WARNING_NAME = ['P', 'E', 'R', 'S', 'C', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'M', 'Z'];

function getFirstCharacter(name: string) {
  return name && name.charAt(0).toUpperCase();
}

function getAvatarColor(name: string) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return PRIMARY.main;
  if (INFO_NAME.includes(getFirstCharacter(name))) return INFO.main;
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return SUCCESS.main;
  if (WARNING_NAME.includes(getFirstCharacter(name))) return WARNING.main;
  if (ERROR_NAME.includes(getFirstCharacter(name))) return ERROR.main;
  return PRIMARY.main;
}

function getAvatarModuleColor(name: string) {
  name = name.toLowerCase();
  if (name === 'token') return WARNING.main;
  return PRIMARY.main;
}

function getAvatarIcon(name: string) {
  name = name.toLowerCase();
  if (name === 'token') return 'bolt';
  return 'app';
}

export function createTextAvatar(name: string) {
  return {
    name: getFirstCharacter(name),
    color: getAvatarColor(name),
  };
}

export function createModuleAvatar(name: string) {
  return {
    icon: getAvatarIcon(name),
    color: getAvatarModuleColor(name),
  };
}
