export function joinTimestamp<T extends boolean>(
  join: boolean,
  isRestful: T
): T extends true ? string : Object

export function joinTimestamp(join: boolean, isRestful: boolean) {
  if (!join) return isRestful ? '' : {}
  const now = new Date().getTime()
  if (isRestful) {
    return `?=${now}`
  }
  return { _t: now }
}
