// src/components/GSelect/GSelect.d.ts
import { DefineComponent } from 'vue';

export interface GSelectComponent extends DefineComponent {
  normalizeKeys: (inputArray: Array<any>, keyName: string, valueParameter: string | ((obj: any) => string)) => Array<{ key: any, value: any }>;
}

declare const GSelect: GSelectComponent;
export default GSelect;
