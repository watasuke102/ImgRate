// ImGrate - Image gallery rated by favorites and comments
// users.ts
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {getSdk} from './graphql';

export function useUserNames(): string[] | undefined {
  const [user_names, set_user_names] = React.useState<string[] | undefined>(undefined);
  React.useEffect(() => {
    (async () => {
      const client = new GraphQLClient('http://localhost:8080/query');
      const sdk = getSdk(client);
      const res = await sdk.UserNames();
      if (!res || !res.users) {
        return;
      }

      set_user_names(res.users.map(u => u?.name ?? ''));
    })();
  }, []);

  return user_names;
}
