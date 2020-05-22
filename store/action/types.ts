export interface PostItem {
  id?: string;
  content?: string;
  timeUpload?: string;
  listComment?: Array<string>;
  listLike?: Array<string>;
  username?: string;
  owner?: string;
  urlImage?: string;
}

export interface CommentItem {
  id?: string;
  content?: string;
  timeUpload?: string;
  listLike?: Array<string>;
  fullname?: string;
  owner?: string;
}

export interface UserInfo {
  uid?: string | any;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  expirationTime?: string | undefined;
}

export interface ListPostData {
  listPostData?: Array<PostItem>;
}

export interface ListCommentData {
  listCommentData?: Array<CommentItem> | [];
}

export interface Comment {
  id: string;
  content: string;
  owner: string;
  listLike: Array<string> | [];
  timeUpload: string;
}
