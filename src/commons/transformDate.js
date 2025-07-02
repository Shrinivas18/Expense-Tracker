export const transformDate = () => {
  const date = new Date();
  const istDateString = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return istDateString;
};
