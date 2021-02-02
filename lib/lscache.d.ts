// https://github.com/pamelafox/lscache
declare module 'lscache' {
  export function get(key: string): string | any | null
  export function set(key: string, value: any | string, time?: number): boolean
  export function remove(key: string): void
  export function flush(): void
  export function flushExpired(): void
  export function setBucket(bucket: string): void
  export function resetBucket(): void
  export function setExpiryMilliseconds(milliseconds: number): void
}
