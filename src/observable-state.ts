function observableState<T extends object>(
    obj: T,
    onChange: (change: { key: string | symbol; value: any }) => void
  ): T {
    return new Proxy<T>(obj, {
      set(target: T, key: PropertyKey, value: any): boolean {
        Reflect.set(target, key, value);
        onChange({ key: key as string, value });
        return true;
      },
    });
  }
  export default observableState