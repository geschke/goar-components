export interface GTableHeader {
  title: string;
  field: string;
  //classes?: string; // currently not used
  type?: string; // optional, could be "checkbox" or "expandable"
  expandableAll?: boolean; // optional, default false. If type "expandable" and set to true, a button for collapse and expand function will be shown in the header
  checkboxStyle?: string; // optional, use "switch" for Bootstrap toggle switch style
  checkboxHeader?: boolean; // optional, set to false when checkbox type is set and the toggle all checkbox in header should not be displayed
  isChecked?: (arg: any) => boolean; // callback function to get the checked status if item is a checkbox
  render?: (arg: any) => string; // callback function to get the content to be rendered of the item
}
