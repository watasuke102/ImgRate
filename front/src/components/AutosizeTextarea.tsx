// ImGrate - Image gallery rated by favorites and comments
// AutosizeTextarea.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Textarea} from '@chakra-ui/react';
import React from 'react';
import ResizeTextarea from 'react-textarea-autosize';

interface Props {
  value: string;
  on_change: (value: string) => void;
}

export const AutosizeTextarea = React.forwardRef<HTMLTextAreaElement, Props>(function AutosizeTextArea(
  props,
  ref,
): JSX.Element {
  return (
    <Textarea
      ref={ref}
      as={ResizeTextarea}
      value={props.value}
      onChange={e => props.on_change(e.target.value)}
      resize={'vertical'}
    />
  );
});
