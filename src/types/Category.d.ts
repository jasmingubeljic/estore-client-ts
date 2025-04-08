export interface Category {
  id: number;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  isHidden: boolean;
}

interface CategoryHtmlForm {
  title: HTMLInputElement;
  image: HTMLInputElement;
  description: HTMLInputElement;
  isHidden: HTMLInputElement;
}
