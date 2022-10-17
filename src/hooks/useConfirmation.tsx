import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface IUseConfirmationContent {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
}

export interface IUseConfirmationHandler<T> {
  open: () => void;
  close: () => void;
  confirm: () => Promise<T>;
  cancel: () => Promise<T>;
  setState: Dispatch<SetStateAction<T>>;
  setContent: Dispatch<SetStateAction<IUseConfirmationContent>>;
}

const initialProps: IUseConfirmationContent = {
  title: '',
  description: '',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
}

export interface IUseConfirmation<T> {
  content: IUseConfirmationContent;
  handler: IUseConfirmationHandler<T>;
  state: T;
  visibility: boolean;
}

export default function useConfirmation<State>(props: IUseConfirmationContent = initialProps, initialState: State): IUseConfirmation<State> {
  const [content, setContent] = useState<IUseConfirmationContent>(props);
  const [state, setState] = useState<State>(initialState);
  const [visibility, setVisibility] = useState<boolean>(false);

  function open(): void {
    setVisibility(true);
  }

  function close(): void {
    setVisibility(false);
  }

  function confirm(): Promise<State> {
    close();
    setState(initialState);
    return Promise.resolve(state);
  }

  function cancel(): Promise<State> {
    close();
    setState(initialState);
    return Promise.resolve(state);

  }

  useEffect(() => {
    if (content.title !== props.title || content.description !== props.description || content.confirmText !== props.confirmText || content.cancelText !== props.cancelText) {
      setContent(props);
    }
  }, [content, props])

  return {
    content,
    handler: { cancel, close, confirm, open, setContent, setState },
    state,
    visibility
  }
}