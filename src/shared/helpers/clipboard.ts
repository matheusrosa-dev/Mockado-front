import { useToastStore } from "@shared/stores/toast";

export const copyToClipboard = async (props: {
  text: string;
  toastMessage: string;
}) => {
  const toast = useToastStore.getState();

  try {
    await navigator.clipboard.writeText(props.text);
    toast.show({
      title: props.toastMessage,
      variant: "success",
    });
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
  }
};
