import { FC } from "react";

interface Props {
  price: number;
  locale: string;
  currency: string;
}

const FormattedPrice: FC<Props> = ({ price, locale, currency }) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

export default FormattedPrice;
