// ImGrate - Image gallery rated by favorites and comments
// CommentModal.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {get_user_name} from '@/utils/LocalStorage';
import {getSdk} from '@/utils/graphql';
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
  UseToastOptions,
  useToast,
} from '@chakra-ui/react';
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {AutosizeTextarea} from './AutosizeTextarea';

interface Props {
  is_open: boolean;
  close: () => void;
}

export function CommentModal(props: Props): JSX.Element {
  const [comment, set_comment] = React.useState('');
  const toast = useToast();

  const send_comment = React.useCallback(async () => {
    const name = get_user_name();
    if (name === null) {
      return;
    }
    const client = new GraphQLClient('http://localhost:8080/query');
    const sdk = getSdk(client);

    const res = await sdk.CreateComment({name: name, comment: comment});

    const option: UseToastOptions = {
      duration: 6000,
      isClosable: true,
      title: 'Failed',
      description: 'Please try again later',
      status: 'error',
    };
    if (res.create_comment) {
      option.title = 'Success';
      option.description = 'Your comment has been applied';
      option.status = 'success';
    }
    toast(option);
    props.close();
  }, [comment, toast, props]);

  return (
    <Modal isOpen={props.is_open} onClose={props.close} closeOnEsc size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Comment</ModalHeader>
        <ModalBody>
          <AutosizeTextarea value={comment} on_change={set_comment} />
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button colorScheme='green' aria-label='Submit' leftIcon={<CheckIcon />} onClick={send_comment}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
