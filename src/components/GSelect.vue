<template>

  <div class="gselect form-control" ref="containerRef" :class="{ 'focus-ring': isFocused }"
    :style="{ maxHeight: height + 'px' }" @focusin="isFocused = true" @focusout="isFocused = false" @blur="onBlur"
    @keydown="handleKeyDown" tabindex="0">

    <ul class="list-group list-group-flush">
      <li v-for="(option, index) in options" :key="index"
        class="list-group-item d-flex justify-content-left align-items-center"
        :class="{ 'selected': selectedKey === option.key && isFocused === true }" @click="selectOption(option.key)">
        <span v-if="selectedKey === option.key" @click.stop="deselect()" class="badge bg-primary"><i class="bi-check-lg"></i></span>
        <span v-else class="badge bg-light"><i class="bi-square"></i></span>
        <span class="px-2">{{ option.value }}</span>
      </li>
    </ul>

  </div>

</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, useSlots, reactive, ref, nextTick } from 'vue';

interface Props {
  modelValue?: string,
  name: string,
  height?: number,
  options: Array<Object>,
  allowDeselect?: boolean, // currently an idea only, allow or disallow deselection of options, default true
}

// todo: add design options like focus-ring color, icon for selected and non-selected items,
// background colors and so on

const model = defineModel()

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  name: '',
  height: 200,
  options: () => [],
  allowDeselect: true, 

})

const emits = defineEmits(['update:modelValue', 'input', 'blur', 'change']);


const containerRef = ref(null);

const selectedKey = ref(props.options.length ? props.options[0].key : '');
const previousKey = ref('');
const deselectedKey = ref('');

const isFocused = ref(false);


onUpdated(() => {
  //console.log("in onUpdate from GSelect with", selectedKey.value);
  if (previousKey.value === '') {
    if (selectedKey.value !== '') {
      previousKey.value = selectedKey.value;
      emitSelectedKey();
    }
  } else if (selectedKey.value != previousKey.value) {

    previousKey.value = selectedKey.value;
    emitSelectedKey();
  } // else do nothing, don't emit
});

function selectOption(key: string) {
  selectedKey.value = key;
}

function emitSelectedKey() {
  //console.log("emit selected key", selectedKey.value.toString());
  //emits("update:modelValue", selectedKey.value.toString());
  // use convenient way described in vue documentatioin
  model.value = selectedKey.value.toString();
  onChange();
}

function onBlur(event) {
  // Weiterleitung des blur-Events, falls nötig
  emits('blur', event);
}


function onChange() {
console.log("in onChange");
  emits('change');
}

function deselect() {
  console.log("in deselect");
  deselectedKey.value = selectedKey.value;
  selectedKey.value = '';
}

async function handleKeyDown(event) {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    // calculate nextIndex 

    const currentIndex = props.options.findIndex(option => option.key === selectedKey.value);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % props.options.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + props.options.length) % props.options.length;
    }

    if (nextIndex !== currentIndex) {
      selectedKey.value = props.options[nextIndex].key;
      // wait for next event loop to use DOM updates
      nextTick().then(() => {
        scrollToSelectedOption(nextIndex);
      });
    }

    await nextTick();
    scrollToSelectedOption(nextIndex);
  } else if (event.key === 'Space' || event.key === ' ') {
    event.preventDefault();
    //console.log("space pressed");
    //console.log(selectedKey.value);
    if (selectedKey.value) {
      //console.log("key is selected, so deselect");
      deselect();
    } else {
      //console.log("key is not selected, so select current index");
      //console.log("deselected key", deselectedKey.value);
      selectedKey.value = deselectedKey.value;
    }
    
  }
}

function scrollToSelectedOption(index) {
  const container = containerRef.value;
  const optionElement = container?.querySelectorAll('.list-group-item')[index];

  if (optionElement) {
    // Option, um das Verhalten anzupassen
    const scrollIntoViewOptions = {
      behavior: 'smooth', // oder "auto"
      block: 'nearest', // vermeidet unnötiges Scrollen, wenn das Element bereits sichtbar ist
      inline: 'start'
    };
    optionElement.scrollIntoView(scrollIntoViewOptions);
  }
}



</script>

<style scoped>
.gselect {

  overflow-y: auto;
  /* Aktivieren der Scrollbar, wenn der Inhalt die maximale Höhe überschreitet */
}

.gselect:focus-within {
  /*  border-color: #80bdff; 
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); 
*/
  /*background-color: rgb(207, 207, 207);
*/
}


.list-group-item {
  cursor: pointer;
}

.selected {
  background-color: #e0e0e0;
}

/*.list-group-item .badge {
  font-size: 1.2em;
}*/

.focus-ring {
  /* Stil für den Fokus-Ring hier, z.B. */
  box-shadow: 0 0 0 2px #007bff;
}

/*
.list-group-item.active {
  background-color: #007bff;
  color: #fff;
}*/
</style>