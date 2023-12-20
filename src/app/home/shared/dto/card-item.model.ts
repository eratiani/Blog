export interface ICardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: [
    {
      id: number;
      name: string;
      text_color: string;
      background_color: string;
    }
  ];
  author: string;
}
