// ImGrate - Image gallery rated by favorites and comments
// ProfileDrawer.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {SetUserNameModal} from '@/components/SetUserNameModal';
import {useUserComments} from '@/utils/api';
import {EditIcon} from '@chakra-ui/icons';
import {
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {UserAvatar} from './UserAvatar';

interface Props {
  user_name: string;
  is_open: boolean;
  close: () => void;
}

export function ProfileDrawer(props: Props): JSX.Element {
  const user_name_modal = useDisclosure();
  const user_comments = useUserComments();

  return (
    <>
      <Drawer placement='bottom' size={'lg'} closeOnEsc isOpen={props.is_open} onClose={props.close}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Profile</DrawerHeader>

          <DrawerBody>
            <Stack spacing={2}>
              <Heading size='lg'>User name</Heading>
              <Flex>
                <UserAvatar user_name={props.user_name} />
                <Spacer />
                <IconButton aria-label='edit user name' icon={<EditIcon />} onClick={user_name_modal.onOpen} />
              </Flex>

              <Heading size='lg'>Comments</Heading>
              {user_comments.state === 'ok' ? (
                user_comments.comments.map((comment, i) => (
                  <Container key={i}>
                    <Text>
                      {comment.commented_to}: {comment.comment} ({comment.created_at})
                    </Text>
                  </Container>
                ))
              ) : (
                <Spinner size={'lg'} />
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <SetUserNameModal is_open={user_name_modal.isOpen} close={user_name_modal.onClose} />
    </>
  );
}
