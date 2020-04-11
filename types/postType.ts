export type TypeOfPost = {
  key: string;
  username: string;
  date: string;
  content: string;
  numberOfHeart: number;
  numberOfComment: number;
};

export type PostItem = {
  id: string;
  content: string;
  timeUpload: string;
  listComment: Array<string>;
  listLike: Array<string>;
  username: string;
};
