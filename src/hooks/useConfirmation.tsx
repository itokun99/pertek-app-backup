import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface IUseConfirmationProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
}

export interface IUseConfirmationHandler {
  open: () => void;
  close: () => void;
  confirm: () => Promise<void>;
  cancel: () => Promise<void>;
  setState: Dispatch<SetStateAction<IUseConfirmationProps>>
}

const initialProps: IUseConfirmationProps = {
  title: '',
  description: '',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
}

export default function useConfirmation(props: IUseConfirmationProps = initialProps): [IUseConfirmationProps, boolean, IUseConfirmationHandler] {
  const [state, setState] = useState<IUseConfirmationProps>(props);
  const [visibility, setVisibility] = useState<boolean>(false);

  function open(): void {
    setVisibility(true);
  }

  function close(): void {
    setVisibility(false);
  }

  function confirm(): Promise<void> {
    close();
    return Promise.resolve();
  }

  function cancel(): Promise<void> {
    close();
    return Promise.resolve();

  }

  useEffect(() => {
    if (state.title !== props.title || state.description !== props.description || state.confirmText !== props.confirmText || state.cancelText !== props.cancelText) {
      setState(props);
    }
  }, [state, props])

  return [state, visibility, { open, close, setState, confirm, cancel }]
}