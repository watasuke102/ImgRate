// ImGrate - Image gallery rated by favorites and comments
// api.ts
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {GraphQLClient} from 'graphql-request';
import React from 'react';
import {get_user_name} from './LocalStorage';
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

type UserDataState = 'ok' | 'loading' | 'err';
interface UserData<T> {
  data: T[];
  state: UserDataState;
  reflesh: () => void;
}
export type UserFavorites = UserData<number>;

export function useUserFavorites(): UserFavorites {
  const [data, set_data] = React.useState<number[]>([]);
  const [state, set_state] = React.useState<UserDataState>('loading');
  const [cnt, set_cnt] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const client = new GraphQLClient('http://localhost:8080/query');
      const sdk = getSdk(client);
      const res = await sdk.UserFavoritesByName({name: get_user_name() ?? ''});
      if (res.users[0]) {
        set_data(res.users[0].favorites);
        set_state('ok');
      } else {
        set_state('err');
      }
    })();
  }, [cnt]);

  return {
    data: data,
    state: state,
    reflesh: () => set_cnt(i => i + 1),
  };
}
