
// src/components/GSelect/normalizeKeys.ts
export function normalizeKeys(inputArray: Array<any>, keyName: string, valueParameter: string | ((obj: any) => string)) {
  return inputArray.map(obj => ({
    key: obj[keyName],
    value: typeof valueParameter === 'function' ? valueParameter(obj) : obj[valueParameter]
  }));
}


