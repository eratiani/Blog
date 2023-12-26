export interface ICardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: ICategories[];
  author: string;
  email?: string;
}
export interface IResponseDTO {
  data: ICardItem[];
}
interface ICategories {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}
export interface IcardWithEmail extends ICardItem {}
