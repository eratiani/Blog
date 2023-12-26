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
interface ICategories {
  id: number;
  name: string;
  text_color: string;
  background_color: string;
}
export interface IcardWithEmail extends ICardItem {}
