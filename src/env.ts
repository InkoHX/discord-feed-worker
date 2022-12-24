/**
 * `CROSSPOST`や`CREATE_THREAD`オプションで使用します。
 * @param value 文字列
 * @returns 文字列が「on」なら`true`を返し、それ以外は`false`を返します。
 */
export const isEnabled = (value: string | undefined): value is string =>
  value?.trim().toLowerCase() === 'on'
