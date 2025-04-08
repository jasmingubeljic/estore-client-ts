import { FormEvent, ChangeEvent } from "react";

export type OnSubmit = (e: FormEvent<HTMLFormElement>) => void;
export type OnSubmitEType = FormEvent<HTMLFormElement>;
export type OnChangeEType = ChangeEvent<HTMLInputElement>;

export interface ProductForm {
  title: {
    value: string;
  };
  description: {
    value: string;
  };
}
