export const firebaseTimestampToDate = ({
  seconds,
  nanoseconds,
}: {
  seconds: number;
  nanoseconds: number;
}) => {
  return new Date(seconds * 1000 + Math.floor(nanoseconds / 1e6));
};
