import { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface MyAnimatedButtonProps extends ButtonProps {
  whileTap?: string;
  variants?: {};
  title?: string;
  component?: any;
}

const defaultVariants = {
  tap: {
    scale: 0.95,
  },
};

const AnimatedButton = ({
  children,
  whileTap,
  component,
  variant,
  variants,
  title,
  ...rest
}: MyAnimatedButtonProps) => {
  return (
    <Button
      component={component}
      whileTap='tap'
      variant={variant || 'contained'}
      variants={variants || defaultVariants}
      {...rest}
    >
      {title || children}
    </Button>
  );
};


export default memo(AnimatedButton);