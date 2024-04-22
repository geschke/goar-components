/*
// Beispiel: Exportieren der Komponenten
export { default as GTable } from './components/GTable.vue';

// Beispiel: Exportieren von Typen
export * from './types/GTableHeader';
*/

import GTable from './components/GTable.vue';
import GSelect from './components/GSelect.vue';
import type { GTableHeader  } from './types/GTableHeader.ts';

export { GTable, GSelect };

export type { GTableHeader }; 


