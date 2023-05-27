import {set_user_name} from '@/utils/LocalStorage';
import {CheckIcon} from '@chakra-ui/icons';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';

interface Props {
  is_open: boolean;
  close?: () => void;
}

export function SetUserNameModal(props: Props): JSX.Element {
  const [user_name, set_user_name_state] = React.useState('');
  const router = useRouter();

  const is_invalid = React.useCallback(() => {
    return user_name === '';
  }, [user_name]);

  const on_confirmed = React.useCallback(() => {
    console.log(user_name);
    if (user_name === '') {
      return;
    }
    set_user_name(user_name);
    router.reload();
  }, [user_name, router]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal isOpen={props.is_open} onClose={props.close ?? (() => {})} closeOnEsc={props.close !== undefined}>
      <ModalOverlay />
      <ModalContent>
        {props.close && <ModalCloseButton />}
        <ModalHeader>Please set your user name</ModalHeader>
        <ModalBody>
          <Input
            value={user_name}
            onChange={e => set_user_name_state(e.target.value)}
            onSubmit={e => {
              e.preventDefault();
              on_confirmed();
            }}
            placeholder='User name'
            isInvalid={is_invalid()}
          />
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button
            colorScheme='green'
            aria-label='Confirm'
            leftIcon={<CheckIcon />}
            onClick={on_confirmed}
            isDisabled={is_invalid()}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
