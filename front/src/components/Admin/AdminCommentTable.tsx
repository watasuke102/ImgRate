// ImGrate - Image gallery rated by favorites and comments
// AdminCommentTable.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ImagesQuery} from '@/utils/graphql';
import React from 'react';
import {Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';

interface Props {
  comments: ImagesQuery['images'][0]['comments'];
}

export function AdminCommentTable(props: Props): JSX.Element {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>UserName</Th>
            <Th>Comment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.comments.map((e, i) => {
            return (
              <Tr key={i}>
                <Td>{e.created_at}</Td>
                <Td>{e.user_name}</Td>
                <Td>{e.comment}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
