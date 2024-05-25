
export interface ToastContent {
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


export const ToastSuccess = <ToastContent>{
  title: "",
  toastClasses: "bg-success text-bg-success",
  headerClasses: "bg-success text-bg-success",
  bodyClasses: "bg-success text-bg-success",
  closeButtonClasses: "btn-close-white",
}


export const ToastWarning = <ToastContent>{
  title: "",
  toastClasses: "bg-warning text-bg-warning",
  headerClasses: "bg-warning text-bg-warning",
  bodyClasses: "bg-warning text-bg-warning",
  //closeButtonClasses: "btn-close-white",
}


export const ToastDanger = <ToastContent>{
  title: "",
  toastClasses: "bg-danger text-bg-danger",
  headerClasses: "bg-danger text-bg-danger",
  bodyClasses: "bg-danger text-bg-danger",
  closeButtonClasses: "btn-close-white",
}


export const ToastInfo = <ToastContent>{
  //title: "",
  toastClasses: "bg-info text-bg-info",
  headerClasses: "bg-info text-bg-info",
  bodyClasses: "bg-info text-bg-info",
  //closeButtonClasses: "btn-close-white",
}
