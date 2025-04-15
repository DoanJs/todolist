export const timeStampToDate = (timestamp: number, symboy: string) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const shortMonth = date.toLocaleString('default', {month: 'short'});
  const fullYear = date.getFullYear();

  return `${day}${symboy}${shortMonth}${symboy}${fullYear}`;
};
