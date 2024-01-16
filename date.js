export const date = function () {
  const curDay = new Date();

  const options = {
    weekday: "long",
    // year: "numeric",
    month: "short",
    day: "numeric",
  };

  return curDay.toLocaleDateString("en-GB", options);
};
