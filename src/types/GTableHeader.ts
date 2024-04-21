export interface GTableHeader {
  title: string;
  field?: string;
  //classes?: string; // currently not used
  type?: string; // optional, could be "checkbox" or "expandable"
  checkboxStyle?: string; // optional, use "switch" for Bootstrap toggle switch style
  isChecked?: (arg: any) => boolean; // callback function to get the checked status if item is a checkbox
  render?: (arg: any) => string; // callback function to get the content to be rendered of the item
}
