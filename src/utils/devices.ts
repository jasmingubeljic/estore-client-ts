export const detectScreen = () => {
  const iw = window.innerWidth;

  if (iw >= 1400) {
    return "xxl";
  } else if (iw >= 1200) {
    return "xl";
  } else if (iw >= 992) {
    return "lg";
  } else if (iw >= 768) {
    return "md";
  } else if (iw >= 576) {
    return "sm";
  } else {
    return "xs";
  }
};
