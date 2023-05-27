// ImGrate - Image gallery rated by favorites and comments
// LocalStorage.ts
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
const key = 'user_name';

export function get_user_name(): string | null {
  return localStorage.getItem(key);
}

export function set_user_name(value: string): void {
  return localStorage.setItem(key, value);
}
