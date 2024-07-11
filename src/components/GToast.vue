<template>
  <div>
     

    <div :class="getToastPlacement">
      <div v-for="toast in getToasts" :id="toast.id" :key="toast.id" :class="getToastClasses(toast)" role="alert"
        aria-live="assertive" aria-atomic="true"
        :data-bs-delay="toast.delay" 
        :data-bs-autohide="toast.autohide" 
        :data-bs-animation="toast.animation" 
        >
        <div :class="getHeaderClasses(toast)">
          <!-- <img src="..." class="rounded me-2" alt="..."> -->
          <strong class="me-auto">{{ toast.title }}</strong>
          <small v-if="toast.secondaryContent" :class="getSecondaryContentClasses(toast)">{{ toast.secondaryContent }}</small>
          <button type="button" :class="getCloseButtonClasses(toast)" data-bs-dismiss="toast" 
          aria-label="Close"></button>
        </div>
        <div v-if="toast.content" :class="getBodyClasses(toast)">
          {{ toast.content }}
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed, onUpdated } from "vue";
import type { GToastContent } from '../types/GToastTypes.ts'

import { useToastsStore } from '../stores/toasts'

import { Toast } from 'bootstrap';

const store = useToastsStore();

let checkLoop = 1; // todo: remove this



// use maximum number, delete toast from array when increasing

// maybe add image to toasts as shown in Bootstrap examples


/**
 * placement: use placement css classes from Bootstrap, see https://getbootstrap.com/docs/5.3/components/toasts/#placement
 * default: bottom right
 * available values:
 * top-0 start-0: Top left
   top-0 start-50 translate-middle-x: Top center
   top-0 end-0">Top right
   top-50 start-0 translate-middle-y: Middle left
   top-50 start-50 translate-middle: Middle center
   top-50 end-0 translate-middle-y: Middle right
   bottom-0 start-0: Bottom left
   bottom-0 start-50 translate-middle-x: Bottom center
   bottom-0 end-0: Bottom right
 */

interface Props {
  placement?: string; // default bottom right
  maxNumber?: number; // default 5, 0 disables limit
}

const props = withDefaults(defineProps<Props>(), {
  placement: "bottom-0 end-0",
  maxNumber: 5,

});

/*
onMounted(() => {
  console.log("in onMounted of GToast component");

});
*/

onUpdated(() => {
  //console.log(new Date().toISOString(), "in onUpdated of GToast ");


  const hiddenToasts = store.getToasts.filter((item) => {  
    return item.showTriggered != true;
  });
  //console.log(new Date().toISOString(), "in onUpdated hidden toasts? ", hiddenToasts.length);

  hiddenToasts.forEach(toastItem => {
    const id = toastItem.id as string; // id does exist!
    //console.log(new Date().toISOString(), "1 const id:", id, " toastitem id ", toastItem.id);
    checkLoop++;
   
    //console.log(new Date().toISOString(), "in loop", checkLoop, toastItem.id);
    let toastElement = document.getElementById(id);
    //console.log(new Date().toISOString(), "2 const id:", id, " toastitem id ", toastItem.id);

    //console.log(new Date().toISOString(), "gefunden? ", checkLoop, toastElement);
    if (toastElement != null) {
      //console.log(new Date().toISOString(), "3 const id:", id, " toastitem id ", toastItem.id);
      if (toastItem.showTriggered === false) {
        //console.log(new Date().toISOString(), "4 const id:", id, " toastitem id ", toastItem.id);
        //console.log(new Date().toISOString(), "showTriggered false von", checkLoop, toastItem.id);
        //store.setShowTriggered(toastItem.id)
        store.setShowTriggered(id)
       
        //console.log(new Date().toISOString(), "5 const id:", id, " toastitem id ", toastItem.id);
        
          toastElement.addEventListener('hidden.bs.toast', () => {
          //console.log(new Date().toISOString(), "hidden event fired! von ", checkLoop, toastElement.id, id);

          store.remove(id);
        

        });
       
        let toastBS = new Toast(toastElement);
        toastBS.show();

      }
    }


  });
 

});

const add = (toast: GToastContent) => {
  //console.log("in add mit ", toast);
  store.add(props.maxNumber, toast);
 
};

defineExpose({
  addToast(toast: GToastContent) {
    add(toast);
  },

});


const getToasts = computed(() => {
  return store.getToasts;
})

const getToastPlacement = computed(() => {
  return "toast-container position-fixed p-3 " + props.placement;
});


function getToastClasses(item: GToastContent) {
  return "gtoast toast" + ((item.toastClasses !== undefined && item.toastClasses !== "") ? " " + item.toastClasses : "");
}

function getHeaderClasses(item: GToastContent) {
  return "toast-header" + ((item.headerClasses !== undefined && item.headerClasses !== "") ? " " + item.headerClasses : "");
}

function getBodyClasses(item: GToastContent) {
  return "toast-body" + ((item.bodyClasses !== undefined && item.bodyClasses != "") ? " " + item.bodyClasses : "");
}

function getSecondaryContentClasses(item: GToastContent) {
  return ((item.secondaryContentClasses !== undefined && item.secondaryContentClasses != "") ? item.secondaryContentClasses : "");
}


function getCloseButtonClasses(item: GToastContent) {
  return "btn-close" + ((item.closeButtonClasses !== undefined && item.closeButtonClasses != "") ? " " + item.closeButtonClasses : "");
}

</script>

<style scoped></style>
