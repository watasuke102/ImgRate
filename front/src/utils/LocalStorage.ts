const key = 'user_name';

export function get_user_name(): string | null {
  return localStorage.getItem(key);
}

export function set_user_name(value: string): void {
  return localStorage.setItem(key, value);
}
