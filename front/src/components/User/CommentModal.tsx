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
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Text,
  UseToastOptions,
  useToast,
} from '@chakra-ui/react';
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {AutosizeTextarea} from './AutosizeTextarea';
import {CommentTable} from './CommentTable';
import {UserComments} from '@/utils/api';
import {API_URL} from '../../../env';

interface Props {
  img_name: string;
  comments: UserComments;
  is_open: boolean;
  close: () => void;
}

export function CommentModal(props: Props): JSX.Element {
  const [comment, set_comment] = React.useState('');
  const [refleshing, set_refleshing] = React.useState(false);
  const toast = useToast();

  const send_comment = React.useCallback(async () => {
    const user_name = get_user_name();
    if (user_name === null) {
      return;
    }
    set_refleshing(true);
    const client = new GraphQLClient(API_URL);
    const sdk = getSdk(client);

    const res = await sdk.CreateComment({name: user_name, comment_to: props.img_name, comment: comment});

    const option: UseToastOptions = {
      duration: 6000,
      isClosable: true,
      title: 'Failed',
      description: 'Please try again later',
      status: 'error',
    };
    if (res.create_comment) {
      option.title = 'Success';
      option.description = 'Your comment has been sent';
      option.status = 'success';
    }
    toast(option);
    props.comments.reflesh();
    set_refleshing(false);
    props.close();
    set_comment('');
  }, [comment, toast, props]);

  return (
    <Modal isOpen={props.is_open} onClose={props.close} closeOnEsc size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Comment</ModalHeader>
        <ModalBody>
          <Stack gap={4}>
            {(() => {
              if (props.comments.state === 'loading') {
                return <Spinner />;
              }
              if (props.comments.comments.length === 0) {
                return <Text>Your comment does not exist for now</Text>;
              }
              return <CommentTable comments={props.comments.comments} />;
            })()}
            <Heading size={'md'}>Add new comment</Heading>
            <AutosizeTextarea value={comment} on_change={set_comment} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button
            colorScheme='green'
            aria-label='Submit'
            leftIcon={<CheckIcon />}
            onClick={send_comment}
            isLoading={refleshing}
            loadingText='Submitting...'
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
