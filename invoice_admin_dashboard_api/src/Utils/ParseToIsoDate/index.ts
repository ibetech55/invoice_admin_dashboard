export const parseToIsoDate = (value: string) => {
  const val = value.split("/");
  let year = val[2];
  if (year.length === 2) {
    year = `20${year}`;
  }
  return `${year}-${val[1]}-${val[0]}`;
};
