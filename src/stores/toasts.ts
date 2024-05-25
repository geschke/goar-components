import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import type { ToastContent } from "../types/GToastTypes.ts";

import { v4 as uuidv4 } from "uuid";


export const useToastsStore = defineStore('toasts', () => {
  //const items = ref(<ToastContent>[])
  const items = ref<ToastContent[]>([]);


  const getToasts = computed(() => items.value)


  function add(maxNumber: number, toast: ToastContent) {
    if (toast.id == undefined) {
      toast.id = "gtoast_" + uuidv4();
    }
    if (toast.showTriggered == undefined) {
      toast.showTriggered = false;
    }
    // set Bootstrap default values 
    if (toast.delay === undefined) {
      toast.delay = 5000; 
    }
    if (toast.autohide === undefined) {
      toast.autohide = true; 
    }
    if (toast.animation === undefined) {
      toast.animation = true;
    }
    if (maxNumber != 0 && items.value.length >= maxNumber) { // 0 disables limit
      items.value.shift();
    }
    items.value.push(toast)
  }

  function setShowTriggered(id: string) {
    const index = items.value.findIndex((obj: any) => obj.id === id);
    items.value[index].showTriggered = true;
  }

  function remove(id: string) {
    //console.log("in remove mit id: ", id)
    const indexToRemove = items.value.findIndex((obj: any) => obj.id === id);
    //console.log("vor:",items.value);
    //items.value.forEach(element => {
    //  console.log(element.title, element.content, element.id, element.showTriggered);
    //});
    if (indexToRemove !== -1) {
      items.value.splice(indexToRemove, 1);
    }
    //console.log("nach:",items.value);
    //items.value.forEach(element => {
    //  console.log(element.title, element.content, element.id, element.showTriggered);
    //});

  }

  return { items, getToasts, setShowTriggered, add, remove }
})