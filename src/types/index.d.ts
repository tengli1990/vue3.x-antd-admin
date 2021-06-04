declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
