// ImGrate - Image gallery rated by favorites and comments
// CommentTable.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {Comment} from '@/utils/graphql';
import React from 'react';
import {Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';

interface Props {
  comments: Comment[];
}

export function CommentTable(props: Props): JSX.Element {
  return (
    <>
      <Heading size={'md'}>Your comment</Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>comment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.comments.map((e, i) => {
              return (
                <Tr key={i}>
                  <Td>{e.created_at}</Td>
                  <Td>{e.comment}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
