// plugin.ts
import { App } from 'vue';
import { createPinia, Pinia } from 'pinia';
import GTable from './components/GTable.vue';
import GSelect from './components/GSelect/GSelect.vue';
import GToast from './components/GToast.vue';



export default {
  install(app: App) {


    let pinia: Pinia;

    //console.log("in export default von GoarComponents");
    if (app.config.globalProperties.$pinia) {
      //console.log("app config globalProperties $pinia vorhanden");
      pinia = app.config.globalProperties.$pinia;
      //console.log(pinia);
    } else {
      //console.log("pinia Initialisierung");
      pinia = createPinia();
      app.use(pinia);
    }

    
    app.component('GTable', GTable);
    app.component('GSelect', GSelect);
    app.component('GToast', GToast);
  }
};
