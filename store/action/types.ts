export interface PostItem {
  id: string;
  content: string;
  timeUpload: string;
  listComment: Array<string>;
  listLike: Array<string>;
  username: string;
}

export interface ListPostData {
  listPostData: Array<PostItem>;
}
