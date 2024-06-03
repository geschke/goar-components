/*
// Beispiel: Exportieren der Komponenten
export { default as GTable } from './components/GTable.vue';

// Beispiel: Exportieren von Typen
export * from './types/GTableHeader';
*/
//import GoarComponents from './plugin.ts';
import GTable from './components/GTable.vue';
import { GSelect } from './components/GSelect';
import GToast from './components/GToast.vue';
import type { GTableHeader  } from './types/GTableHeader.ts';
import type { GToastContent  } from './types/GToastTypes.ts'; // rename!!!
import { GToastSuccess, GToastDanger, GToastInfo, GToastWarning  } from './types/GToastTypes.ts'; // rename!!!

export { GTable, GSelect, GToast, GToastSuccess, GToastDanger, GToastInfo, GToastWarning };

export type { GTableHeader, GToastContent }; 
//export default GoarComponents;


// Exportiere das Plugin separat
export { default as GoarComponents } from './plugin';