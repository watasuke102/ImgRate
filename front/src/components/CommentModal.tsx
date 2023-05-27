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
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

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
          <Textarea value={comment} onChange={e => set_comment(e.target.value)} resize={'vertical'} />
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
