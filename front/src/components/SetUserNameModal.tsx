// ImGrate - Image gallery rated by favorites and comments
// SetUserNameModal.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {set_user_name} from '@/utils/LocalStorage';
import {useUserNames} from '@/utils/api';
import {getSdk} from '@/utils/graphql';
import {CheckIcon} from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
import {GraphQLClient} from 'graphql-request';
import {useRouter} from 'next/router';
import React from 'react';
import {Loading} from './Loading';

interface Props {
  is_open: boolean;
  close?: () => void;
}

type NameValidity = 'ok' | 'empty' | 'exists';

export function SetUserNameModal(props: Props): JSX.Element {
  const [user_name, set_user_name_state] = React.useState('');
  const router = useRouter();
  const exist_user_names = useUserNames();

  const validate_input = React.useCallback((): NameValidity => {
    if (user_name === '') {
      return 'empty';
    }
    if (exist_user_names?.indexOf(user_name) !== -1) {
      return 'exists';
    }
    return 'ok';
  }, [user_name, exist_user_names]);

  const on_confirmed = React.useCallback(() => {
    console.log(user_name);
    if (user_name === '') {
      return;
    }
    set_user_name(user_name);
    (async () => {
      const client = new GraphQLClient('http://localhost:8080/query');
      const sdk = getSdk(client);
      await sdk.CreateUser({name: user_name});
      router.reload();
    })();
  }, [user_name, router]);

  if (exist_user_names === undefined) {
    return <Loading />;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal isOpen={props.is_open} onClose={props.close ?? (() => {})} closeOnEsc={props.close !== undefined}>
      <ModalOverlay />
      <ModalContent>
        {props.close && <ModalCloseButton />}
        <ModalHeader>Please set your user name</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={validate_input() !== 'ok'}>
            <Input
              value={user_name}
              onChange={e => set_user_name_state(e.target.value)}
              onSubmit={e => {
                e.preventDefault();
                on_confirmed();
              }}
              placeholder='User name'
              isInvalid={validate_input() !== 'ok'}
            />
            {(() => {
              switch (validate_input()) {
                case 'ok':
                  return <FormHelperText>Enter any username</FormHelperText>;
                case 'empty':
                  return <FormErrorMessage>Empty name is not acceptable</FormErrorMessage>;
                case 'exists':
                  return <FormErrorMessage>That name is already used</FormErrorMessage>;
              }
            })()}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Spacer />
          <Button
            colorScheme='green'
            aria-label='Confirm'
            leftIcon={<CheckIcon />}
            onClick={on_confirmed}
            isDisabled={validate_input() !== 'ok'}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
