export const shortTitleFor = (customName: string, productName: string, fallback: string) =>
  customName || productName || fallback
