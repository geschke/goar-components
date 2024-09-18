// /src/index.ts 
import { GSelect } from './components/GSelect';
import type { GTableHeader } from './types/GTableHeader.ts';
import GTable from './components/GTable.vue';

import GToast from './components/GToast.vue';
import type { GToastContent } from './types/GToastTypes.ts';

import { GToastSuccess, GToastDanger, GToastInfo, GToastWarning } from './types/GToastTypes';


export type { GTableHeader, GToastContent };

export { GSelect, GTable, GToast, GToastDanger, GToastInfo, GToastSuccess, GToastWarning };

export { default as GoarComponents } from './plugin';
