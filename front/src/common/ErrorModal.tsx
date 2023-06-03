// ImGrate - Image gallery rated by favorites and comments
// ErrorModal.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text} from '@chakra-ui/react';

interface Props {
  message: string;
}

export function ErrorModal(props: Props): JSX.Element {
  return (
    <Modal onClose={() => undefined} isOpen isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text color='red.400'>{props.message}</Text>
        </ModalHeader>
        <ModalBody>
          <Text>Please reload this page.</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
