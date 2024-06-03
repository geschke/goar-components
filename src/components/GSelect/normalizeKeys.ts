// useNormalizeKeys.ts
/*export function useNormalizeSelectKeys(inputArray: Array<any>, keyName: string, valueParameter: string | ((obj: any) => string)): OutputObject {
  return inputArray.map(obj => ({
    key: obj[keyName],
    value: typeof valueParameter === 'function' ?
      valueParameter(obj) :
      obj[valueParameter]
  }));
}
*/
// src/components/GSelect/useNormalizeSelectKeys.ts
export function normalizeKeys(inputArray: Array<any>, keyName: string, valueParameter: string | ((obj: any) => string)) {
  return inputArray.map(obj => ({
    key: obj[keyName],
    value: typeof valueParameter === 'function' ? valueParameter(obj) : obj[valueParameter]
  }));
}


/*  function normalizeSelectKeys(inputArray: Array<any>, keyName: string, valueParameter: string | ((obj: any) => string)): OutputObject {
    return inputArray.map(obj => ({
      key: obj[keyName],
      value: typeof valueParameter === 'function' ?
        valueParameter(obj) :
        obj[valueParameter]
    }));
  }
*/
  /*  function normalizeSelectKeys(inputArray: Array<Object>, keyName: string, valueNames: string[]): OutputObject {
      return inputArray.map(obj => ({
        key: obj[keyName],
        value: valueNames.map(name => obj[name]).join(' ')
      }));
  
  
    }*/

  //return { normalizeSelectKeys };
//}
