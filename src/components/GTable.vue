<template>
  <div _class="row">
   
    <table :class="tableClasses">
      <thead :class="tableHeadClasses">
        <tr>
          <th v-for="header in headers" :key="header.field" scope="col">
            <span :class="checkboxStyle(header)" v-if="header.type && header.type == 'checkbox'">
              <input class="form-check-input" type="checkbox" value="" :id="tableIdentifier('th')">

            </span>
            <span v-else>
              {{ header.title }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody :class="tableBodyClasses">

        <template v-for="(item, index ) in getItems()" :key="item[props.keyField]">
          <tr>
            <td v-for="(header, hindex) in headers" :key="header.title">


              <template v-if="slots[header.field] && header.type !== 'expandable'">
                <slot :name="header.field" :value="item"></slot>
              </template>

              <span v-else-if="header.type && header.type == 'checkbox'" :class="checkboxStyle(header)">
                <input class="form-check-input" type="checkbox" v-model="checkedItems[item[header.field]]"
                  @change="handleCheckEvent(header, item, index)" :checked="callChecked(header, item, index)"
                  role="switch" :id="tableIdentifier('td_' + item[header.field])">

              </span>
              <div v-else-if="header.type == 'expandable'">
                <button type="button" @click="toggleExpanded(index, header.field)" 
                  class="btn btn-link btn-no-underline"
                  aria-expanded="false" aria-controls="getCollapseTargetId(index)"><i :class="['bi bi-caret-right',  expandedItems[index] ? ['icon-expanded'] : ['icon-collapsed']]"></i></button>

              </div>

              <div v-else-if="header.field">
                {{ item[header.field] }}

              </div>
              <div v-else="header.render">
                {{ callRender(header, item) }}
              </div>

            </td>

          </tr>
          <Transition name="collapse">
          <tr v-if="expandedItems[index]" class="collapse-row" :id="getCollapseId(index)">
            <td :colspan="headers.length">
              <slot :name="expandedItemFields[index]" :value="index"></slot>
            </td>

          </tr>
          </Transition>
        </template>

      </tbody>
    </table>




    <nav v-if="pagination" aria-label="Table navigation">
      <ul :class="getPaginationClasses()">

        <li v-if="props.showPageFirstLast" class="page-item"><button class="page-link" href="#" @click="gotoPage(1)"><i
              v-if="showPageIcons" class="bi-chevron-double-left"></i><span v-else>{{ props.pageStringFirst
              }}</span></button></li>

        <li class="page-item"><button class="page-link" href="#" @click="gotoPage(getPrevPage(currentPage))"><i
              v-if="showPageIcons" class="bi-chevron-left"></i><span v-else>{{ props.pageStringPrev }}</span></button>
        </li>

        <li v-for="(n, index) in paginationRange()" :class="getPageClasses(n)"><button class="page-link"
            @click="gotoPage(n)">{{ n }}</button></li>
        <li class="page-item"><button class="page-link" href="#" @click="gotoPage(getNextPage(currentPage))"><i
              v-if="showPageIcons" class="bi-chevron-right"></i><span v-else>{{ props.pageStringNext }}</span></button>
        </li>
        <li v-if="props.showPageFirstLast" class="page-item"><button class="page-link" href="#"
            @click="gotoPage(numberOfPages)"><i v-if="showPageIcons" class="bi-chevron-double-right"></i><span v-else>{{
      props.pageStringLast }}</span></button></li>


      </ul>


    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useSlots, onUpdated, ref } from 'vue';
import type { GTableHeader } from "../types/GTableHeader.ts";

import { v4 as uuidv4 } from 'uuid';


const slots = useSlots();
const emits = defineEmits();
const uuid = uuidv4();


interface Props {
  classes?: string, // CSS table classes
  bodyClasses?: string, // CSS classes of table body (tbody)
  headClasses?: string, // CSS classes of table head (thead)
  headers: Array<GTableHeader>,
  items: Array<Object>,
  keyField?: string,
  checkEvent?: string, // name of event to be triggered when checkbox is clicked (changed)
  expandEvent?: string, // name of event to be triggered when expand button is clicked
  pagination?: boolean,
  currentPage?: number, // default 1
  itemsPerPage?: number, // default 10
  maxPageLinks?: number, // default 5
  showPageFirstLast?: boolean, // default false
  showPageIcons?: boolean, // default false
  pageStringFirst?: string, // default "First"
  pageStringLast?: string, // default "Last"
  pageStringPrev?: string, // default "Previous"
  pageStringNext?: string, // default "Next"
  paginationAlignment?: string, // default "justify-content-end", all CSS classes possible
  paginationSize?: string, // default use Bootstraps defaults, possible values: pagination-lg (large), pagination-sm (small)

}

const props = withDefaults(defineProps<Props>(), {
  classes: '',
  bodyClasses: '',
  headClasses: '',
  headers: () => [],
  items: () => [],
  keyField: '',
  checkEvent: '',
  expandEvent: '',
  pagination: true,
  currentPage: 1,
  itemsPerPage: 10,
  maxPageLinks: 5,
  showPageFirstLast: false,
  showPageIcons: false,
  pageStringFirst: 'First',
  pageStringLast: 'Last',
  pageStringPrev: 'Previous',
  pageStringNext: 'Next',
  paginationAlignment: 'justify-content-end',
  paginationSize: '',



});



const itemsPerPage = ref(props.itemsPerPage);
const maxPageLinks = ref(props.maxPageLinks);
const currentPage = ref(props.currentPage);



interface AssocArrayBoolean {
  [key: number]: boolean;
}

interface AssocArrayString {
  [key: number]: string;
}


let checkedItems: AssocArrayBoolean = {};
const expandedItems = ref(<AssocArrayBoolean>{});
let expandedItemFields: AssocArrayString = {};


onMounted(() => {
  console.log("in onMounted of GTable new");

  //uuid.value = uuidv4();
  //console.log(uuid);
  //console.log("Pagination? ", props.pagination);
  checkedItems = {};
  expandedItems.value = {};
  expandedItemFields = {};
  /*for (let i = 0; i < props.items.length ; i++) {
    let isChecked = false; // header.checked(props.items[i]);
    checkedItems.value[i] = isChecked;
  }
  console.log("after setting checkedItems");
  console.log(checkedItems.value);
*/
});

onUpdated(() => {
  console.log("in onUpdated of GTable");
});

const numberOfItems = computed(() => {
  return props.items.length;
});

const numberOfPages = computed(() => {
  return Math.ceil(numberOfItems.value / itemsPerPage.value);
});



const tableClasses = computed(() => {
  //console.log(props.classes);
  return "table" + (props.classes != "" ? " " + props.classes : "");
});

const tableBodyClasses = computed(() => {
  //console.log(props.bodyClasses);
  return (props.bodyClasses != "" ? props.bodyClasses : "");
});

const tableHeadClasses = computed(() => {
  //console.log(props.headClasses);
  return (props.headClasses != "" ? props.headClasses : "");
});

const callRender = (header: GTableHeader, item: any) => {
  if (header.render) {
    return header.render(item);
  }
};

const callChecked = (header: GTableHeader, item: any, index: number) => {
  let checkedValue = null;
  //console.log("in callChecked mit item id: ");
  //console.log(item[header.field]);
  if (header.isChecked) {
    //console.log("Wert vorhanden?", checkedItems.hasOwnProperty(item[header.field]));

    // todo: optimize, return value earlier
    if (checkedItems.hasOwnProperty(item[header.field])) {
      checkedValue = checkedItems[item[header.field]];
    } else {
      checkedValue = header.isChecked(item);
    }
    checkedItems[item[header.field]] = checkedValue;
    //console.log(checkedItems);
    return checkedValue; // header.checked(item);
  }
};

function toggleExpanded(index: number, field: string) {
  let expanded = false;
  expandedItemFields[index] = field;
  if (expandedItems.value.hasOwnProperty(index)) {
    expanded = expandedItems.value[index];
  } // else expanded is false from preset
  expandedItems.value[index] = !expanded;
  //console.log("expanded is? ", expanded, expandedItems.value[index]);
  if (props.expandEvent) { // emit event if prop is defined
    //console.log("emit expandEvent mit index ", index);
    emits(props.expandEvent, { // send row index and expanded status
      index: index,
      expanded: expandedItems.value[index],
    });
  }

}


function tableIdentifier(prefix: string): string {

  return prefix + "_" + uuid;
}

function getCollapseId(index: number): string {
  return tableIdentifier("tr_collapse") + '_' + index;
}

function getCollapseTargetId(index: number): string {
  return '#' + tableIdentifier("tr_collapse") + '_' + index;
}


function checkboxStyle(header: GTableHeader): string {
  let classes = "form-check";
  if (header.checkboxStyle && header.checkboxStyle == "switch") {
    classes += " form-switch";
  }
  return classes;
}

function handleCheckEvent(header: GTableHeader, item: any, index: number) {
  //console.log("in handleCheckEvent GTable");
  //console.log(item);
  //console.log(checkedItems);
  //console.log(props.checkEvent);
  if (props.checkEvent) {
    emits(props.checkEvent, {
      item: item,
      status: checkedItems[item[header.field]], //true,
    });
  }

}

function getPaginationClasses() {
  let classes = 'pagination';
  classes += ((props.paginationAlignment != '') ? ' ' + props.paginationAlignment : '');
  classes += ((props.paginationSize != '') ? ' ' + props.paginationSize : '');
  return classes;
}

function getPageClasses(page: number) {
  let pageItemClass = "page-item";
  if (page == currentPage.value) {
    // add active state
    pageItemClass += " active";
  }
  return pageItemClass;
}

function gotoPage(page: number) {
  //console.log("Go to page: ", page);
  currentPage.value = page;
}

/*function getFirstPage() {
  return 1; // hmm...
}

function getLastPage() {
  return numberOfPages.value;
}*/

function getPrevPage(current: number) {
  return (current - 1 < 1 ? 1 : current - 1);
}

function getNextPage(current: number) {
  if (current + 1 > numberOfPages.value) {
    return numberOfPages.value;
  }
  return current + 1;
}

function getItems() {
  if (props.pagination) {
    let startRange = (currentPage.value - 1) * itemsPerPage.value;

    return props.items.slice(startRange, startRange + itemsPerPage.value);
  }
  return props.items;
}

function paginationRange() {
  let r = [];
  let maxPageLinksShown = maxPageLinks.value;
  //console.log("number of pages", numberOfPages.value);
  //console.log("max page links: ", maxPageLinks.value);
  if (numberOfPages.value < maxPageLinksShown) {
    maxPageLinksShown = numberOfPages.value;
  }

  let startRange = currentPage.value - (Math.floor(maxPageLinksShown / 2));
  //console.log("startRange vor:", startRange);
  if (startRange < 1) {
    startRange = 1;
  }
  //console.log("startRange nach Beschränkung:", startRange);
  let endRange = currentPage.value + (Math.floor(maxPageLinksShown / 2));
  //console.log("endRange vor:", endRange);
  if (endRange > numberOfPages.value) {
    endRange = numberOfPages.value;
  } else if (endRange < maxPageLinksShown) {
    endRange = maxPageLinksShown;
  }
  if (endRange - startRange + 1 < maxPageLinksShown) {
    startRange = endRange - maxPageLinksShown + 1;
  }
  //console.log("nach Korrektur startRange:", startRange);

  //console.log("endRange nach Beschränkung:", endRange);
  r = Array.from({ length: endRange - startRange + 1 }, (_, index) => index + startRange);
  //console.log(r);
  return r;

}



</script>

<style scoped>
.collapse-row-enter-active, .collapse-row-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

.collapse-row-enter, .collapse-row-leave-to {
  height: 0;
}

.icon-collapsed {
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.15s ease;
}

.btn-no-underline {
text-decoration: none;
}

.icon-expanded {
  display: flex;
  align-items: center;
  position: relative;
  transform: rotate(90deg);
  transition: transform 0.15s ease;
}
</style>