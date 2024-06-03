// src/components/GSelect/index.ts
import GSelect from './GSelect.vue';
import { normalizeKeys } from './normalizeKeys';

//GSelect.useNormalizeSelectKeys = useNormalizeSelectKeys;
(GSelect as any).normalizeKeys = normalizeKeys;


export { GSelect };
