import { memo } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

export interface MyAnimatedButtonProps extends ButtonProps {
  whileTap?: string;
  variants?: {};
  title?: string;
  component?: React.ElementType;
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
      component={component || motion.a}
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