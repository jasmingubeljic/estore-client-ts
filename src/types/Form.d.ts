import { FormEvent, ChangeEvent } from "react";

export type OnSubmit = (e: FormEvent<HTMLFormElement>) => void;
export type OnSubmitEType = FormEvent<HTMLFormElement>;
export type OnChangeEType = ChangeEvent<HTMLInputElement>;

interface ProductForm {
  title: HTMLInputElement;
  image: HTMLInputElement;
  price: HTMLInputElement;
  isUsed: HTMLInputElement;
  description: HTMLInputElement;
  categoryId: HTMLInputElement;
  isHidden: HTMLInputElement;
}
