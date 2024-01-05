export const parseMonthYr = (value: string) => {
  const val = value.split("/");
  const month = val[0];
  const year = val[1];
  const formatYr = `${new Date().getFullYear().toString().substring(0,2)}${year}`;

const getYear = (month:string) => {
  let formattedYr = formatYr
  if(formatYr.length === 6) formattedYr = formatYr.substring(2,6)
  return `${formattedYr}-${month}-01`;
}
  
  if (month === "JAN") {
    return getYear('01');
  } else if (month === "FEV") {
    return getYear('02');
  } else if (month === "MAR") {
    return getYear('03');
  } else if (month === "ABR") {
    return getYear('04');
  } else if (month === "MAI") {
    return getYear('05');
  } else if (month === "JUN") {
    return getYear('06');
  } else if (month === "JUL") {
    return getYear('07');
  } else if (month === "AGO") {
    return getYear('08');
  } else if (month === "SET") {
    return getYear('09');
  } else if (month === "OUT") {
    return getYear('01');
  } else if (month === "NOV") {
    return getYear('11');
  } else if (month === "DEZ") {
    return getYear('12');
  } else {
    return getYear(month);
  }
};


