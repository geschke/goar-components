/*
// Beispiel: Exportieren der Komponenten
export { default as GTable } from './components/GTable.vue';

// Beispiel: Exportieren von Typen
export * from './types/GTableHeader';
*/
//import GoarComponents from './plugin.ts';
import GTable from './components/GTable.vue';
import GSelect from './components/GSelect.vue';
import GToast from './components/GToast.vue';
import type { GTableHeader  } from './types/GTableHeader.ts';
import type { ToastContent  } from './types/GToastTypes.ts'; // rename!!!
import { ToastSuccess, ToastDanger, ToastInfo, ToastWarning  } from './types/GToastTypes.ts'; // rename!!!

export { GTable, GSelect, GToast, ToastSuccess, ToastDanger, ToastInfo, ToastWarning };

export type { GTableHeader, ToastContent }; 
//export default GoarComponents;


// Exportiere das Plugin separat
export { default as GoarComponents } from './plugin';