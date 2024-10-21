<template>
  <div>

    <table :class="tableClasses">
      <thead :class="tableHeadClasses">
        <tr>
          <th v-for="header in headers" :key="header.field" scope="col">
            <span v-if="header.type && header.type == 'checkbox' && header.checkboxHeader == false">&nbsp;</span>
            <span v-else-if="header.type && header.type == 'checkbox'" :class="checkboxStyle(header)">
              <input class="form-check-input" type="checkbox" v-bind:disabled="isEmptyDisabled"
                :checked="isAllChecked(header)" @change="handleHeaderCheckEvent($event, header)"
                :id="tableIdentifier('th')">

            </span>
            <span v-else>
              {{ header.title }}
            </span>
          </th>
        </tr>
      </thead>


      <tbody :class="tableBodyClasses">
        <tr v-if="showLoading && loading && !items.length">
          <td :colspan="headers.length">
            <slot name="tmplLoading">
              <div class="col text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </slot>
          </td>
        </tr>

        <tr v-if="showEmpty && !loading && !items.length">
          <td :colspan="headers.length">
            <slot name="tmplEmpty">
              <div class="col text-center">
                <i class="bi bi-inbox"></i> No Available Data
              </div>
            </slot>
          </td>
        </tr>

        <template v-for="(item, index) in getItems()" :key="item[props.keyField]">
          <tr>
            <td v-for="(header) in headers" :key="header.title">


              <template v-if="slots[header.field] && header.type !== 'expandable'">
                <slot :name="header.field" :value="item"></slot>
              </template>

              <span v-else-if="header.type && header.type == 'checkbox'" :class="checkboxStyle(header)">
                <input class="form-check-input" type="checkbox" v-model="checkedItems[item[header.field]]"
                  @change="handleCheckEvent(header, item)" :checked="callChecked(header, item)" role="switch"
                  :id="tableIdentifier('td_' + item[header.field])">


              </span>
              <div v-else-if="header.type == 'expandable'">
                <button type="button" @click="toggleExpanded(getItemsIndex(index), header.field)"
                  class="btn btn-link btn-no-underline" aria-expanded="false"
                  aria-controls="getCollapseTargetId(index)"><i
                    :class="['bi bi-caret-right', expandedItems[getItemsIndex(index)] ? ['icon-expanded'] : ['icon-collapsed']]"></i></button>

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
            <tr v-if="expandedItems[getItemsIndex(index)]" class="collapse-row"
              :id="getCollapseId(getItemsIndex(index))">
              <td :colspan="headers.length">
                <slot :name="expandedItemFields[getItemsIndex(index)]" :index="getItemsIndex(index)"
                  :item="items[getItemsIndex(index)]"></slot>
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

        <li v-for="(n) in paginationRange()" :class="getPageClasses(n)"><button class="page-link"
            @click="gotoPage(n)">{{ n
            }}</button></li>
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
import { computed, onMounted, useSlots, ref, reactive } from 'vue';
import type { GTableHeader } from "../types/GTableHeader.ts";
import type { GTableItem } from "../types/GTableItem.ts";

import { v4 as uuidv4 } from 'uuid';
import { start } from 'repl';


const slots = useSlots();
const emits = defineEmits();
const uuid = uuidv4();

interface Props {
  classes?: string, // CSS table classes
  bodyClasses?: string, // CSS classes of table body (tbody)
  headClasses?: string, // CSS classes of table head (thead)
  headers: Array<GTableHeader>,
  items: Array<GTableItem>,
  keyField?: string,
  checkEvent?: string, // name of event to be triggered when checkbox is clicked (changed)

  expandEvent?: string, // name of event to be triggered when expand button is clicked
  showLoading?: boolean, // default false, show loading status according to "loading" prop
  loading?: boolean, // default false; if true and the items array is empty, a loading animation will be shown
  showEmpty?: boolean, // default true; show message if items array is empty
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
  showEmpty: true,
  showLoading: false,
  loading: false,
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
const offsetIndex = ref(0);


interface AssocArrayBoolean {
  [key: number]: boolean;
}

interface AssocArrayString {
  [key: number]: string;
}


const checkedItems = reactive(<AssocArrayBoolean>{});
const expandedItems = ref(<AssocArrayBoolean>{});
let expandedItemFields: AssocArrayString = {};



defineExpose({
  collapseAll() {
    collapseAll();
  },
  expandAll() {
    expandAll();
  }

});

onMounted(() => {
  expandedItems.value = {};
  expandedItemFields = {};
});

/*onUpdated(() => {
  console.log("in onUpdated of GTable");
});
*/

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


const isAllChecked = (header: GTableHeader) => {
  const items = getItems();
  if (items.length == 0) {
    return false;
  }
  let isChecked = true;
  items.forEach(function (loopitem) {
    if (checkedItems[loopitem[header.field]] != true) {
      isChecked = false;
    }
  });
  //console.log("in isAllChecked mit result ", isChecked);
  return isChecked;
};

const isEmptyDisabled = computed(() => {
  const items = getItems();
  if (items.length == 0) {
    return true;
  }
  return false;
});

const callChecked = (header: GTableHeader, item: any) => {
  let checkedValue = null;
  //console.log("in callChecked mit item id: ");
  //console.log(item[header.field]);

  // does callback function exist? 
  // when callback function to get "checked" status is available, 
  // call it to get information about the (initial) checked status of current item
  if (header.isChecked) {
    //console.log("Wert vorhanden?", checkedItems.hasOwnProperty(item[header.field]));

    // todo: optimize, return value earlier
    if (checkedItems.hasOwnProperty(item[header.field])) {
      // if checked status is taken from previous call, then use it!
      checkedValue = checkedItems[item[header.field]];
    } else {
      checkedValue = header.isChecked(item);
      // take checked status into corresponding checkedItems array
      checkedItems[item[header.field]] = checkedValue;
    }

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
      item: props.items[index]
    });
  }

}


function tableIdentifier(prefix: string): string {

  return prefix + "_" + uuid;
}

function getCollapseId(index: number): string {
  return tableIdentifier("tr_collapse") + '_' + index;
}

function collapseAll() {
  //console.log("in GTable collapseAll");
  //console.log(expandedItems.value);
  //console.log(expandedItemFields);
  Object.keys(expandedItems.value).forEach((key) => {
    const value = expandedItems.value[Number(key)];

    //console.log(`Key: ${key}, Value: ${value}`);
    if (value == true) {
      expandedItems.value[Number(key)] = false;
    }

  });
}

function expandAll() {
  //console.log("in GTable expandAll");
  //console.log(expandedItems.value);
  //console.log(expandedItemFields);

  const items = getItems();

  // find first (!) field of type "expandable"
  // Currently only one field of type "expandable" is supported.
  let expandableHeader = null;
  for (const header of props.headers) {
    if (header.type === 'expandable') {
      expandableHeader = header;
      break;
    }
  }
  //console.log("found expandable header", expandableHeader);
  if (expandableHeader !== null) {

    for (const [index, item] of items.entries()) {
      const key = item[props.keyField];
      //console.log("aktueller index", index);
      //console.log("get items index of index:", getItemsIndex(index));
      const itemsIndex = getItemsIndex(index);
      //console.log("keyField aus Props:", key);

      //console.log("column content", item);

      // taken from toggleExpand, but without toggling
      let expanded = false;
      expandedItemFields[index] = expandableHeader.field;
      if (expandedItems.value.hasOwnProperty(itemsIndex)) {
        expanded = expandedItems.value[itemsIndex];
      } // else expanded is false from preset
      // todo optimize here, expand only if currently isn't expanded
       
      expandedItems.value[itemsIndex] = true;
      //console.log("expanded is? ", expanded, expandedItems.value[index]);
      if (props.expandEvent) { // emit event if prop is defined
        //console.log("emit expandEvent mit index ", index);
        emits(props.expandEvent, { // send row index and expanded status
          index: itemsIndex,
          expanded: expandedItems.value[itemsIndex],
          item: props.items[itemsIndex]
        });
      }
    }

  }


}

/*function getCollapseTargetId(index: number): string {
  return '#' + tableIdentifier("tr_collapse") + '_' + index;
}*/


function checkboxStyle(header: GTableHeader): string {
  let classes = "form-check";
  if (header.checkboxStyle && header.checkboxStyle == "switch") {
    classes += " form-switch";
  }
  return classes;
}

function handleCheckEvent(header: GTableHeader, item: any) {
  //console.log("in handleCheckEvent GTable");
  //console.log(item);
  //console.log(checkedItems);
  //console.log(props.checkEvent);

  /*  const items = getItems();
    const currentStatus = checkedItems[item[header.field]];
    let targetStatus = true;
    console.log("Status after change:", currentStatus);
    console.log("targetSTatus at start", targetStatus);
  
    items.forEach(function (loopitem) {
      console.log(checkedItems[loopitem[header.field]]);
      if (checkedItems[loopitem[header.field]] != true) {
        console.log("Set targetstatus at ", loopitem);
        targetStatus = false;
      }
    });
  
    console.log("targetSTatus is: ", targetStatus);
  */

  if (props.checkEvent) {
    emits(props.checkEvent, {
      item: item,
      status: checkedItems[item[header.field]], //true,
    });
  }

}

function handleHeaderCheckEvent(event: Event, header: GTableHeader) {
  //console.log("in handleHeaderCheckEvent GTable");

  const target = event.target as HTMLInputElement;
  const isChecked = target.checked;
  //console.log("checkboxes in table must set to:", isChecked);
  const items = getItems();

  items.forEach(function (item) {
    //console.log(item[header.field]);
    if (checkedItems.hasOwnProperty(item[header.field])) { // previous value is available
      if (checkedItems[item[header.field]] != isChecked) {
        // only set and trigger event if current value differs from target value
        //console.log("field ", item[header.field], " set to: ", isChecked);
        checkedItems[item[header.field]] = isChecked;
        handleCheckEvent(header, item);
      }

    } else {
      checkedItems[item[header.field]] = isChecked;
    }
  });



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
    offsetIndex.value = startRange; // yeah, ugly side effect... 

    return props.items.slice(startRange, startRange + itemsPerPage.value);
  }
  return props.items;
}

function getItemsIndex(slicedIndex: number) {
  return offsetIndex.value + slicedIndex;
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
.collapse-row-enter-active,
.collapse-row-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

.collapse-row-enter,
.collapse-row-leave-to {
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