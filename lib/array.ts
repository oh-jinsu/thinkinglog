export function mapParallel<T, U>(
    arr: T[],
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
): Promise<Awaited<U>[]> {
    return Promise.all(arr.map(callback, thisArg));
}
