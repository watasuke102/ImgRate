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
import {Comment, Image, ImagesQuery, getSdk} from './graphql';

export function useUserNames(): string[] | undefined {
  const [user_names, set_user_names] = React.useState<string[] | undefined>(undefined);
  React.useEffect(() => {
    (async () => {
      try {
        const client = new GraphQLClient('http://localhost:8080/query');
        const sdk = getSdk(client);
        const res = await sdk.UserNames();
        if (!res || !res.users) {
          return;
        }
        set_user_names(res.users.map(u => u?.name ?? ''));
      } catch {
        return;
      }
    })();
  }, []);

  return user_names;
}

type UserDataState = 'ok' | 'loading' | 'err';

export interface UserFavorites {
  favorites: string[];
  state: UserDataState;
  reflesh: () => void;
}

export interface UserComments {
  comments: Comment[];
  state: UserDataState;
  reflesh: () => void;
}

type ImageData = ImagesQuery['images'];
export interface Images {
  data: ImageData;
  state: UserDataState;
}

export function useUserFavorites(): UserFavorites {
  const [data, set_data] = React.useState<string[]>([]);
  const [state, set_state] = React.useState<UserDataState>('loading');
  const [cnt, set_cnt] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      try {
        const client = new GraphQLClient('http://localhost:8080/query');
        const sdk = getSdk(client);
        const res = await sdk.UserFavoritesByName({name: get_user_name() ?? ''});
        if (!res.users[0]) {
          throw Error;
        }
        set_data(res.users[0].favorites);
        set_state('ok');
      } catch {
        set_state('err');
      }
    })();
  }, [cnt]);

  return {
    favorites: data,
    state: state,
    reflesh: () => set_cnt(i => i + 1),
  };
}

export function useUserComments(): UserComments {
  const [data, set_data] = React.useState<Comment[]>([]);
  const [state, set_state] = React.useState<UserDataState>('loading');
  const [cnt, set_cnt] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      try {
        const client = new GraphQLClient('http://localhost:8080/query');
        const sdk = getSdk(client);
        const res = await sdk.UserCommentsByName({name: get_user_name() ?? ''});
        if (res.comments === null) {
          throw Error;
        }
        set_data(res.comments.filter((e): e is NonNullable<Comment> => e !== null));
        set_state('ok');
      } catch {
        set_state('err');
      }
    })();
  }, [cnt]);

  return {
    comments: data,
    state: state,
    reflesh: () => set_cnt(i => i + 1),
  };
}

export function useImages(): Images {
  const [data, set_data] = React.useState<ImageData>([]);
  const [state, set_state] = React.useState<UserDataState>('loading');

  React.useEffect(() => {
    (async () => {
      try {
        const client = new GraphQLClient('http://localhost:8080/query');
        const sdk = getSdk(client);
        const res = await sdk.Images();
        if (res.images === null) {
          throw Error;
        }
        set_data(res.images);
        set_state('ok');
      } catch {
        set_state('err');
      }
    })();
  }, []);

  return {data, state};
}
