export const parseNumber = (value: string | number) => {
  return Number(parseFloat(value.toString().replace(",", ".")).toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: 8,
  }));
};
