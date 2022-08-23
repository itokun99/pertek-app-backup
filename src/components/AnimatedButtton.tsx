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

export const AnimatedButton = ({ children, whileTap, variant, variants, ...rest }: MyAnimatedButtonProps) => {
  return (
    <Button
      component={motion.button}
      whileTap={whileTap || 'tap'}
      variant={variant || 'contained'}
      variants={variants || defaultVariants}
      {...rest}
    >
      {children}
    </Button>
  );
};
