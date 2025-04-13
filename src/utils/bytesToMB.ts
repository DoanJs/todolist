export const bytesToMB = (bytes: number) => {
  const MB = bytes / (1024 * 1024);
  return MB.toFixed(2); // Keep 2 decimal places
};
