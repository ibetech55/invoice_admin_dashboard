export const  copyToClipboard = (text: string | number) => {
    navigator.clipboard.writeText(text.toString());
  }