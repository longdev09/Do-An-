import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useCustomToast() {
  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
  };
  const showWarningToast = (message) => {
    toast.warning(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return { showErrorToast, showSuccessToast, showWarningToast };
}
