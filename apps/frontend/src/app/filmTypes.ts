import { MediaTypes } from "./mediaTypes";

export interface FilmExample {

  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  date: string;
  filmId: string;
  image: Array <MediaTypes>;
  publishedAt: string;
  updatedAt: string;
}
