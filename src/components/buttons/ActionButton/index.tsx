import { memo, useId } from 'react';
import Stack from '@mui/material/Stack';
import AnimatedButton, { MyAnimatedButtonProps as AnimatedButtonProps } from '../AnimatedButton';

export interface ActionButtonProps {
  buttons: Array<AnimatedButtonProps>
}

const ActionButton = ({ buttons }: ActionButtonProps): JSX.Element => {

  return (
    <Stack direction="row" gap={2}>
      {buttons.map((button, i) => (
        <AnimatedButton
          key={`action-button-${i}`}
          {...button}
        />
      ))}
    </Stack>
  )
}

export default memo(ActionButton)