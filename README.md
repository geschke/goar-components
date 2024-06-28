# goar-components Documentation

# goar-components

## Introduction

Welcome to `goar-components`, a small Vue.js component library that originated from practical needs in a larger project.

This library came to life when a set of components, initially developed for a specific project, showed potential for reuse. The decision to extract these components into a separate library was driven by the simple idea of making them available for future projects.

Built on Vue.js, `goar-components` follows Bootstrap's design principles, aiming to offer a handful of useful components that integrate well with Bootstrap-based projects. It's important to note that this library doesn't aim to be comprehensive or to replace more established component libraries. Instead, it offers a modest selection of components that might prove helpful in certain scenarios.

The components in this library were created to solve specific challenges encountered during development. While they may not cover all possible use cases, they might save some time for developers facing similar needs.

`goar-components` is shared with the community in the spirit of open source collaboration. It's a small contribution to the vast ecosystem of Vue.js components, and hopefully, it might be useful for other developers working on similar projects.

Feel free to explore the components and use them if they fit your needs. Feedback and suggestions are always appreciated, as they can help improve the library over time.

Let's start by looking at the GTable component, a data table solution that forms part of this small library.

## Introduction to goar-components

Welcome to **goar-components**, a Vue.js component library inspired by the design principles of Bootstrap. This library originated from a larger project, where the need for reusable and consistent components across different applications became apparent. Recognizing the potential and versatility of these components, they were extracted from the larger project into a standalone library to be utilized in various projects.

The creation of goar-components was driven by the necessity for practical solutions and effective design patterns, rather than an attempt to replace existing libraries. It embodies the design standards and patterns found useful in previous work, making it a reliable choice for enhancing development processes with consistent UI elements.

The idea for goar-components emerged during a Vue.js project when components that adhered closely to Bootstrap's design standards were needed. Existing libraries often had unique styles or required significant customization to fit into the project. The goal was to create a library that worked without extensive CSS adjustments or additional styling. This effort is not intended to discredit other authors and their excellent work, but rather to meet specific needs that were not fully addressed by existing solutions.

Currently, goar-components includes only the functionality that was needed for the original project. However, it may be expanded in the future to include additional features and components as new requirements arise.

This documentation provides detailed information on each component, including usage examples, props, and customization options. The goal is to offer a comprehensive guide that helps seamlessly integrate goar-components into projects, ensuring a smooth and efficient development experience.



Thank you for your interest in goar-components. Let's dive in and explore the possibilities!


# goar-components

A collection of Vue.js components to enhance your web applications.

## Components

### GTable

A versatile and highly customizable table component for Vue.js, designed to handle various data display and interaction needs.

#### Features

- Customizable headers and rows
- Support for checkboxes and expandable rows
- Pagination with various configuration options
- Fully supports Bootstrap 5 design and utilizes Bootstrap CSS framework resources exclusively

#### Installation

To install the `goar-components` package, use npm or yarn:

```bash
npm install goar-components
```

or

```bash
yarn add goar-components
```

#### Basic Usage

Here is a simple example of how to use the `GTable` component in your Vue.js project.

```vue
<template>
  <div>
    <h2>Basic Table Example</h2>
    <GTable
      :headers="headers"
      :items="items"
      keyField="id"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GTable from 'goar-components/GTable';

interface Item {
  id: number;
  name: string;
  description: string;
}

const headers = ref([
  { title: 'ID', field: 'id' },
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' }
]);

const items = ref<Item[]>([
  { id: 1, name: 'Item 1', description: 'Description of item 1' },
  { id: 2, name: 'Item 2', description: 'Description of item 2' },
  { id: 3, name: 'Item 3', description: 'Description of item 3' }
]);
</script>
```

#### Features and Props

| Prop                 | Type                  | Default                  | Description                                                                          |
|----------------------|-----------------------|--------------------------|--------------------------------------------------------------------------------------|
| `classes`            | `String`              | `''`                     | CSS classes for the table                                                            |
| `bodyClasses`        | `String`              | `''`                     | CSS classes for the table body (tbody)                                               |
| `headClasses`        | `String`              | `''`                     | CSS classes for the table head (thead)                                               |
| `headers`            | `Array<GTableHeader>` | `[]`                     | Array of header objects                                                              |
| `items`              | `Array`               | `[]`                     | Array of data items to display                                                       |
| `keyField`           | `String`              | `''`                     | Key field name to uniquely identify each item                                        |
| `checkEvent`         | `String`              | `''`                     | Event name triggered when a checkbox is clicked                                      |
| `expandEvent`        | `String`              | `''`                     | Event name triggered when an expand button is clicked                                |
| `pagination`         | `Boolean`             | `true`                   | Enable or disable pagination                                                         |
| `currentPage`        | `Number`              | `1`                      | Current page number                                                                  |
| `itemsPerPage`       | `Number`              | `10`                     | Number of items per page                                                             |
| `maxPageLinks`       | `Number`              | `5`                      | Maximum number of page links to display                                              |
| `showPageFirstLast`  | `Boolean`             | `false`                  | Show or hide first and last page links                                               |
| `showPageIcons`      | `Boolean`             | `false`                  | Show or hide pagination icons                                                        |
| `pageStringFirst`    | `String`              | `'First'`                | Text for the first page link                                                         |
| `pageStringLast`     | `String`              | `'Last'`                 | Text for the last page link                                                          |
| `pageStringPrev`     | `String`              | `'Previous'`             | Text for the previous page link                                                      |
| `pageStringNext`     | `String`              | `'Next'`                 | Text for the next page link                                                          |
| `paginationAlignment`| `String`              | `'justify-content-end'`  | CSS classes for pagination alignment                                                 |
| `paginationSize`     | `String`              | `''`                     | Size of pagination controls (e.g., 'pagination-lg' for large, 'pagination-sm' for small) |

#### Events

`GTable` emits the following events:

- **checkEvent**: Emitted when a checkbox is clicked.
  - Payload: `{ item: Object, status: boolean }`
- **expandEvent**: Emitted when an expandable row is toggled.
  - Payload: `{ index: number, expanded: boolean }`

#### Slots

`GTable` supports scoped slots for custom rendering of expandable rows.

- **Scoped Slot Props**:
  - `value`: The data item for the current row.

#### Examples

**Example with Checkboxes**

Here is an example of how to use checkboxes within the `GTable` component.

```vue
<template>
  <div>
    <h2>Table with Checkboxes</h2>
    <GTable
      :headers="headers"
      :items="items"
      keyField="id"
      @checkEvent="handleCheckEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GTable from 'goar-components/GTable';

interface Item {
  id: number;
  name: string;
  selected: boolean;
}

const headers = ref([
  { title: 'ID', field: 'id' },
  { title: 'Name', field: 'name' },
  { title: 'Select', field: 'selected', type: 'checkbox' }
]);

const items = ref<Item[]>([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: true },
  { id: 3, name: 'Item 3', selected: false }
]);

function handleCheckEvent({ item, status }: { item: Item, status: boolean }) {
  console.log('Checkbox clicked:', item, status);
  item.selected = status;
}
</script>
```

**Example with Expandable Rows**

Here is an example of how to use expandable rows within the `GTable` component.

```vue
<template>
  <div>
    <h2>Table with Expandable Rows</h2>
    <GTable
      :headers="headers"
      :items="items"
      keyField="id"
      @expandEvent="handleExpandEvent"
    >
      <template #expandable="{ value }">
        <div class="card card-body">
          <p><strong>Description:</strong> {{ value.description }}</p>
          <p><strong>Details:</strong> {{ value.details }}</p>
        </div>
      </template>
    </GTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GTable from 'goar-components/GTable';

interface Item {
  id: number;
  name: string;
  description: string;
  details: string;
}

const headers = ref([
  { title: '', field: 'expandable', type: 'expandable' },
  { title: 'ID', field: 'id' },
  { title: 'Name', field: 'name' }
]);

const items = ref<Item[]>([
  { id: 1, name: 'Item 1', description: 'Description of item 1', details: 'Additional details of item 1' },
  { id: 2, name: 'Item 2', description: 'Description of item 2', details: 'Additional details of item 2' },
  { id: 3, name: 'Item 3', description: 'Description of item 3', details: 'Additional details of item 3' }
]);

function handleExpandEvent({ index, expanded }: { index: number, expanded: boolean }) {
  console.log('Row expanded:', index, expanded);
}
</script>

<style scoped>
.card {
  margin-top: 1em;
}
</style>
```

#### Types

The `GTable` component uses the following types:

```typescript
export interface GTableHeader {
  title: string;
  field: string;
  type?: string;
  checkboxStyle?: string;
  checkboxHeader?: boolean;
  isChecked?: (arg: any) => boolean;
  render?: (arg: any) => string;
}
```



### GSelect

A customizable and user-friendly select box component for Vue.js, designed to offer a more aesthetically pleasing alternative to the standard HTML select element. It supports configurable height and selection features.

#### Features

- Customizable height
- Keyboard navigation support
- Deselect option
- Fully supports Bootstrap 5 design and utilizes Bootstrap CSS framework resources exclusively

#### Installation

To install the `goar-components` package, use npm or yarn:

```bash
npm install goar-components
```

or

```bash
yarn add goar-components
```

#### Basic Usage

Here is a simple example of how to use the `GSelect` component in your Vue.js project.

```vue
<template>
  <div>
    <h2>Basic Select Box Example</h2>
    <GSelect
      v-model="selectedValue"
      :options="options"
      name="basicSelect"
      :height="150"
    />
    <p>Selected Value: {{ selectedValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GSelect from 'goar-components/GSelect';

const selectedValue = ref<string>('');
const options = ref<Array<{ key: string; value: string }>>([
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' }
]);
</script>
```

#### Features and Props

| Prop          | Type                 | Default | Description                                                              |
|---------------|----------------------|---------|--------------------------------------------------------------------------|
| `modelValue`  | `String`             | `''`    | The currently selected value                                             |
| `name`        | `String`             | `''`    | The name attribute for the select box                                    |
| `height`      | `Number`             | `200`   | The maximum height of the select box (in pixels)                         |
| `options`     | `Array<GSelectOption>`| `[]`    | The options to display in the select box                                 |
| `allowDeselect`| `Boolean`           | `true`  | Whether to allow deselection of the selected option                      |

#### Events

`GSelect` emits the following events:

- **update:modelValue**: Emitted when the selected value changes.
- **input**: Emitted when an input event occurs.
- **blur**: Emitted when the select box loses focus.
- **change**: Emitted when the selected option changes.

#### Types

The `GSelect` component uses the following types:

```typescript
interface GSelectOption {
  key: string;
  value: any;
}
```

#### Examples

**Example with Keyboard Navigation and Deselect Option**

Here is an example of how to use the `GSelect` component with keyboard navigation and the option to deselect the selected item.

```vue
<template>
  <div>
    <h2>Select Box with Keyboard Navigation and Deselect Option</h2>
    <GSelect
      v-model="selectedValue"
      :options="options"
      name="keyboardSelect"
      :height="150"
    />
    <p>Selected Value: {{ selectedValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GSelect from 'goar-components/GSelect';

const selectedValue = ref<string>('');
const options = ref<Array<{ key: string; value: string }>>([
  { key: '1', value: 'Option 1' },
  { key: '2', value: 'Option 2' },
  { key: '3', value: 'Option 3' }
]);

function handleSelectChange(newValue: string) {
  console.log('Selected value changed:', newValue);
}

function handleBlur(event: FocusEvent) {
  console.log('Select box lost focus:', event);
}
</script>
```

**Example with Multiple Select Boxes**

Here is an example of how to use multiple `GSelect` components within a form.

```vue
<template>
  <div>
    <h2>Form with Multiple Select Boxes</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="roleSelect">Role</label>
        <GSelect
          v-model="selectedRole"
          :options="roleOptions"
          name="roleSelect"
          :height="200"
        />
        <p>Selected Role: {{ selectedRole }}</p>
      </div>

      <div class="form-group">
        <label for="userSelect">User</label>
        <GSelect
          v-model="selectedUser"
          :options="userOptions"
          name="userSelect"
          :height="200"
        />
        <p>Selected User: {{ selectedUser }}</p>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GSelect from 'goar-components/GSelect';

const selectedRole = ref<string>('');
const selectedUser = ref<string>('');
const roleOptions = ref<Array<{ key: string; value: string }>>([
  { key: '1', value: 'Admin' },
  { key: '2', value: 'Editor' },
  { key: '3', value: 'Viewer' }
]);
const userOptions = ref<Array<{ key: string; value: string }>>([
  { key: '1', value: 'User 1' },
  { key: '2', value: 'User 2' },
  { key: '3', value: 'User 3' }
]);

function handleSubmit() {
  console.log('Form submitted with:', { selectedRole: selectedRole.value, selectedUser: selectedUser.value });
}
</script>
```


Ja, ich kann die Anwendungsbeispiele aus dem übermittelten Code verwenden und ein README.md für die `GToast`-Komponente erstellen. Hier ist die strukturierte Dokumentation:

---

# goar-components

A collection of Vue.js components to enhance your web applications.

## Components

### GToast

A customizable toast notification component for Vue.js, designed to display temporary messages to users. It supports different styles, placements, and auto-hide functionality.

#### Features

- Customizable toast appearance and behavior
- Supports various placement options
- Auto-hide and animation options
- Fully supports Bootstrap 5 design and utilizes Bootstrap CSS framework resources exclusively

#### Installation

To install the `goar-components` package, use npm or yarn:

```bash
npm install goar-components
```

or

```bash
yarn add goar-components
```

#### Basic Usage

Here is a simple example of how to use the `GToast` component in your Vue.js project.

```vue
<template>
  <div>
    <h2>Basic Toast Example</h2>
    <button @click="showToast" class="btn btn-primary">Show Toast</button>
    <GToast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GToast, GToastSuccess } from 'goar-components';

const toast = ref();

function showToast() {
  toast.value.addToast({
    ...GToastSuccess,
    title: "Success!",
    content: "This is a success message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}
</script>
```

#### Features and Props

| Prop       | Type     | Default        | Description                                                                                                      |
|------------|----------|----------------|------------------------------------------------------------------------------------------------------------------|
| `placement`| `String` | `"bottom-0 end-0"` | Placement of the toast container. Uses Bootstrap placement classes.                                              |
| `maxNumber`| `Number` | `5`            | Maximum number of toasts to display. Set to `0` to disable the limit.                                             |

#### Events

`GToast` does not emit any custom events.

#### Slots

`GToast` does not use any slots.

#### Examples

**Example with Different Toast Types**

Here is an example of how to use different types of toasts within the `GToast` component.

```vue
<template>
  <div>
    <h2>Toast Types Example</h2>
    <button @click="showSuccessToast" class="btn btn-success">Show Success Toast</button>
    <button @click="showWarningToast" class="btn btn-warning">Show Warning Toast</button>
    <button @click="showDangerToast" class="btn btn-danger">Show Danger Toast</button>
    <button @click="showInfoToast" class="btn btn-info">Show Info Toast</button>
    <GToast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GToast, GToastSuccess, GToastWarning, GToastDanger, GToastInfo } from 'goar-components';

const toast = ref();

function showSuccessToast() {
  toast.value.addToast({
    ...GToastSuccess,
    title: "Success!",
    content: "This is a success message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}

function showWarningToast() {
  toast.value.addToast({
    ...GToastWarning,
    title: "Warning!",
    content: "This is a warning message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}

function showDangerToast() {
  toast.value.addToast({
    ...GToastDanger,
    title: "Danger!",
    content: "This is a danger message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}

function showInfoToast() {
  toast.value.addToast({
    ...GToastInfo,
    title: "Info!",
    content: "This is an info message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}
</script>
```

**Example with Custom Placement and Limit**

Here is an example of how to use the `GToast` component with a custom placement and a limit on the number of toasts.

```vue
<template>
  <div>
    <h2>Custom Placement and Limit Example</h2>
    <button @click="showToast" class="btn btn-primary">Show Toast</button>
    <GToast ref="toast" placement="top-0 end-0" :maxNumber="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GToast, GToastInfo } from 'goar-components';

const toast = ref();

function showToast() {
  toast.value.addToast({
    ...GToastInfo,
    title: "Info!",
    content: "This is an info message.",
    delay: 3000,
    autohide: true,
    animation: true,
  });
}
</script>
```

#### Types

The `GToast` component uses the following types:

```typescript
export interface GToastContent {
  id?: string;
  title: string;
  content?: string;
  secondaryContent?: string;
  showTriggered: boolean;
  delay?: number;
  animation: boolean;
  autohide: boolean;
  toastClasses: string;
  headerClasses: string;
  bodyClasses: string;
  closeButtonClasses: string;
  secondaryContentClasses: string;
}

export const GToastSuccess: GToastContent = {
  title: "",
  toastClasses: "bg-success text-bg-success",
  headerClasses: "bg-success text-bg-success",
  bodyClasses: "bg-success text-bg-success",
  closeButtonClasses: "btn-close-white",
}

export const GToastWarning: GToastContent = {
  title: "",
  toastClasses: "bg-warning text-bg-warning",
  headerClasses: "bg-warning text-bg-warning",
  bodyClasses: "bg-warning text-bg-warning",
}

export const GToastDanger: GToastContent = {
  title: "",
  toastClasses: "bg-danger text-bg-danger",
  headerClasses: "bg-danger text-bg-danger",
  bodyClasses: "bg-danger text-bg-danger",
  closeButtonClasses: "btn-close-white",
}

export const GToastInfo: GToastContent = {
  title: "",
  toastClasses: "bg-info text-bg-info",
  headerClasses: "bg-info text-bg-info",
  bodyClasses: "bg-info text-bg-info",
}
```

#### License

This project is licensed under the MIT License.
