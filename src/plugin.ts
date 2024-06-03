// plugin.ts
import { App } from 'vue';
import { createPinia } from 'pinia';
import GTable from './components/GTable.vue';
import GSelect from './components/GSelect/GSelect.vue';
import GToast from './components/GToast.vue';

const GoarComponents = {
  install(app: App) {
    const pinia = createPinia();
    app.use(pinia);

    app.component('GTable', GTable);
    app.component('GSelect', GSelect);
    app.component('GToast', GToast);
  }
};

export default GoarComponents;
