import { FormEvent } from "react";

export type SubmitHandler = (e: FormEvent<HTMLFormElement>) => Promise<void>;
