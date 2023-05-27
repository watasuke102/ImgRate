import { Textarea } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import React from 'react';

interface Props {
  value: string;
  on_change: (value: string) => void;
}

export const AutosizeTextarea = React.forwardRef<HTMLTextAreaElement, Props>(function AutosizeTextArea(props, ref): JSX.Element {
  return <Textarea ref={ref} as={ResizeTextarea} value={props.value} onChange={e => props.on_change(e.target.value)} resize={'vertical'} />;
});
