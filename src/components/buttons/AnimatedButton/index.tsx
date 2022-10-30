import { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface MyAnimatedButtonProps extends ButtonProps {
  variants?: {};
  title?: string;
  component?: any;
}

const AnimatedButton = ({
  children,
  component,
  variant,
  title,
  ...rest
}: MyAnimatedButtonProps) => {
  return (
    <Button
      component={component}
      variant={variant || 'contained'}
      {...rest}
    >
      {title || children}
    </Button>
  );
};


export default memo(AnimatedButton);