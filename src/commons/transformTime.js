export const transformTime = () => {
  const date = new Date();
  const istDateString = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return istDateString.toUpperCase();
};
