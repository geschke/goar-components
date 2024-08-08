// /src/index.ts 
//export { default as BaseButton } from "./components/BaseButton.vue";
import BaseButton from './components/BaseButton.vue';
import BToast from './components/BToast.vue';
import { GSelect } from './components/GSelect';
import type { GTableHeader } from './types/GTableHeader.ts';
import GTable from './components/GTable.vue';

import GToast from './components/GToast.vue';
import type { GToastContent } from './types/GToastTypes.ts';

import { GToastSuccess, GToastDanger, GToastInfo, GToastWarning } from './types/GToastTypes';


export type { GTableHeader, GToastContent };

export { GSelect, GTable, GToast, GToastDanger, GToastInfo, GToastSuccess, GToastWarning, BaseButton, BToast };

export { default as GoarComponents } from './plugin';

//import GToast from './components/GToast.vue';
//import type { GTableHeader  } from './types/GTableHeader.ts';

//export { GTable, GSelect, GToast, GToastSuccess, GToastDanger, GToastInfo, GToastWarning };

//export type { GTableHeader, GToastContent }; 


//export { default as GoarComponents } from './plugin';