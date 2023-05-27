// ImGrate - Image gallery rated by favorites and comments
// CommentModal.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {CheckIcon} from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import {AutosizeTextarea} from './AutosizeTextarea';

interface Props {
  is_open: boolean;
  close: () => void;
}

export function CommentModal(props: Props): JSX.Element {
  const [comment, set_comment] = React.useState('');

  return (
    <Modal isOpen={props.is_open} onClose={props.close} closeOnEsc>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Comment</ModalHeader>
        <ModalBody>
          <AutosizeTextarea value={comment} on_change={set_comment} />
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button colorScheme='green' aria-label='Submit' leftIcon={<CheckIcon />} onClick={props.close}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
