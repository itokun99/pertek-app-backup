import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

export interface MyAnimatedButtonProps extends ButtonProps {
  whileTap?: string;
  variants?: {};
  component?: React.ElementType;
}

const defaultVariants = {
  tap: {
    scale: 0.95,
  },
};

export const AnimatedButton = ({
  children,
  whileTap,
  component,
  variant,
  variants,
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
      {children}
    </Button>
  );
};
