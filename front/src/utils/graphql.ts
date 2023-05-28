import {GraphQLClient} from 'graphql-request';
import {GraphQLClientRequestHeaders} from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {[_ in K]?: never};
export type Incremental<T> = T | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string | number; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
};

export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  comments: Array<Scalars['String']['output']>;
  favorites: Array<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create_comment: Scalars['Boolean']['output'];
  create_user: Scalars['Boolean']['output'];
  update_user: Scalars['Boolean']['output'];
};

export type MutationCreate_CommentArgs = {
  input: NewComment;
};

export type MutationCreate_UserArgs = {
  input: NewUser;
};

export type MutationUpdate_UserArgs = {
  input: UserUpdate;
};

export type NewComment = {
  comment: Scalars['String']['input'];
  user_name: Scalars['String']['input'];
};

export type NewUser = {
  user_name: Scalars['String']['input'];
};

export type UserUpdate = {
  favorites?: InputMaybe<Scalars['String']['input']>;
  user_name: Scalars['String']['input'];
};

export type UserNamesQueryVariables = Exact<{[key: string]: never}>;

export type UserNamesQuery = {__typename?: 'Query'; users: Array<{__typename?: 'User'; name: string} | null>};

export type UserFavoritesByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type UserFavoritesByNameQuery = {
  __typename?: 'Query';
  users: Array<{__typename?: 'User'; favorites: Array<number>} | null>;
};

export type UserCommentsByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type UserCommentsByNameQuery = {
  __typename?: 'Query';
  users: Array<{__typename?: 'User'; comments: Array<string>} | null>;
};

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type CreateUserMutation = {__typename?: 'Mutation'; create_user: boolean};

export type UpdateUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  favorites: Scalars['String']['input'];
}>;

export type UpdateUserMutation = {__typename?: 'Mutation'; update_user: boolean};

export type CreateCommentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  comment: Scalars['String']['input'];
}>;

export type CreateCommentMutation = {__typename?: 'Mutation'; create_comment: boolean};

export const UserNamesDocument = gql`
  query UserNames {
    users {
      name
    }
  }
`;
export const UserFavoritesByNameDocument = gql`
  query UserFavoritesByName($name: String!) {
    users(name: $name) {
      favorites
    }
  }
`;
export const UserCommentsByNameDocument = gql`
  query UserCommentsByName($name: String!) {
    users(name: $name) {
      comments
    }
  }
`;
export const CreateUserDocument = gql`
  mutation CreateUser($name: String!) {
    create_user(input: {user_name: $name})
  }
`;
export const UpdateUserDocument = gql`
  mutation UpdateUser($name: String!, $favorites: String!) {
    update_user(input: {user_name: $name, favorites: $favorites})
  }
`;
export const CreateCommentDocument = gql`
  mutation CreateComment($name: String!, $comment: String!) {
    create_comment(input: {user_name: $name, comment: $comment})
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UserNames(
      variables?: UserNamesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserNamesQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UserNamesQuery>(UserNamesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}),
        'UserNames',
        'query',
      );
    },
    UserFavoritesByName(
      variables: UserFavoritesByNameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserFavoritesByNameQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UserFavoritesByNameQuery>(UserFavoritesByNameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserFavoritesByName',
        'query',
      );
    },
    UserCommentsByName(
      variables: UserCommentsByNameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserCommentsByNameQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UserCommentsByNameQuery>(UserCommentsByNameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserCommentsByName',
        'query',
      );
    },
    CreateUser(
      variables: CreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateUserMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateUserMutation>(CreateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateUser',
        'mutation',
      );
    },
    UpdateUser(
      variables: UpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateUserMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<UpdateUserMutation>(UpdateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateUser',
        'mutation',
      );
    },
    CreateComment(
      variables: CreateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateCommentMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<CreateCommentMutation>(CreateCommentDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateComment',
        'mutation',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
