import { NumericDictionary } from 'lodash';

export interface PostItem {
  id?: string;
  content?: string;
  timeUpload?: string;
  listComment?: Array<string>;
  listLike?: Array<string>;
  username?: string;
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
