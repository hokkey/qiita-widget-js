export function numToString(num: number): string {
  if (Number.isNaN(num)) return null;
  return num + '';
}

export function shuffleArray<T>(source: T[]): T[] {
  const array = source.concat();

  let n: number = array.length;

  while (n) {
    const i = Math.floor(Math.random() * n--);
    const t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}

export function sortArray(source: any[], sortKey: string): any[] {

  return source.sort((a, b): number => {

    if (typeof a[sortKey] === 'undefined') {
      return 0;
    }

    if (typeof b[sortKey] === 'undefined') {
      return 0;
    }

    const asc = parseInt(a[sortKey], 10);
    const bsc = parseInt(b[sortKey], 10);

    if (Number.isNaN(asc) || Number.isNaN(bsc)) {
      return 0;
    }

    if (asc < bsc) return 1;
    if (asc > bsc) return -1;
    return 0;
  });
}

export function isType(obj: any, type: string): boolean {
  const t = Object.prototype.toString.call(obj).toLowerCase();
  return t === `[object ${type.toLowerCase()}]`;
}

export function toBoolean(str: string): boolean {
  return str.toLowerCase() === "true";
}


export function initSerialNumArray(length: number): number[] {
  return Array(length).fill(0).map((v: number, i: number) => i);
}
