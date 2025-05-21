import { toast, ToastOptions, TypeOptions } from "react-toastify";

interface ShowToastParams {
  message: string;
  type?: TypeOptions;
  autoClose?: number | false;
  isLoading?: boolean;
  closeButton?: boolean;
  position?: ToastOptions["position"];
  theme?: ToastOptions["theme"];
  pauseOnHover?: boolean;
  hideProgressBar?: boolean;
  onClose?: () => void;
}

export const showToastify = ({
  message,
  type = "default",
  autoClose = 3000,
  isLoading = false,
  closeButton = true,
  position = "top-right",
  theme = "colored",
  pauseOnHover = true,
  hideProgressBar = false,
  onClose,
}: ShowToastParams) => {
  toast(message, {
    type,
    autoClose,
    isLoading,
    closeButton,
    position,
    theme,
    pauseOnHover,
    hideProgressBar,
    onClose,
  });
};
