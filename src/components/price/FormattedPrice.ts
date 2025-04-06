const FormattedPrice = ({ price, locale, currency }) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

export default FormattedPrice;
