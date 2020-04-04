import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type AuthParamsList = {
  ForgotPassword: undefined;
  SignIn: undefined;
};

export type AuthNavigatorProps<T extends keyof AuthParamsList> = {
  navigation: StackNavigationProp<AuthParamsList, T>;
  route: RouteProp<AuthParamsList, T>;
};

export type HomeParamsList = {
  Home: undefined;
  UpLoadPost: undefined;
  Post: undefined;
};

export type HomeNavigatorProps<T extends keyof HomeParamsList> = {
  navigation: StackNavigationProp<HomeParamsList, T>;
  route: RouteProp<HomeParamsList, T>;
};

export type NotificationParamsList = {
  Notification: undefined;
  Post: undefined;
};

export type NotificationNavigatorProps<T extends keyof NotificationParamsList> = {
  navigation: StackNavigationProp<NotificationParamsList, T>;
  route: RouteProp<NotificationParamsList, T>;
};

export type GroupParamsList = {
  Group: undefined;
  CreateNewGroup: undefined;
  GroupHome: undefined;
  Post: undefined;
  UpLoadPost: undefined;
};

export type GroupNavigatorProps<T extends keyof GroupParamsList> = {
  navigation: StackNavigationProp<GroupParamsList, T>;
  route: RouteProp<GroupParamsList, T>;
};

export type MessageParamsList = {
  Messages: undefined;
  Message: undefined;
  NewMessage: undefined;
};

export type MessageNavigatorProps<T extends keyof MessageParamsList> = {
  navigation: StackNavigationProp<MessageParamsList, T>;
  route: RouteProp<MessageParamsList, T>;
};

export type DocumentationParamsList = {
  ListFolderDocumentation: undefined;
  ListDocumentation: undefined;
  UploadNewDocumentation: undefined;
};

export type DocumentationNavigatorProps<T extends keyof DocumentationParamsList> = {
  navigation: StackNavigationProp<DocumentationParamsList, T>;
  route: RouteProp<DocumentationParamsList, T>;
};

export type BottomTabParamsList = {
  HomeNavigator: undefined;
  MessageNavigator: undefined;
  GroupNavigator: undefined;
  NotificationNavigator: undefined;
  DocumentationNavigator: undefined;
};

export type BottomNavigatorProps<T extends keyof BottomTabParamsList> = {
  navigation: StackNavigationProp<BottomTabParamsList, T>;
  route: RouteProp<BottomTabParamsList, T>;
};

export type DrawerParamsList = {
  BottomTab: undefined;
  InfoUser: undefined;
  Setting: undefined;
};

export type DrawerNavigatorProps<T extends keyof DrawerParamsList> = {
  navigation: StackNavigationProp<DrawerParamsList, T>;
  route: RouteProp<DrawerParamsList, T>;
};

export type RootParamsList = {
  BottomNavigator: undefined;
  DrawerNavigator: undefined;
};

export type RootNavigatorProps<T extends keyof RootParamsList> = {
  navigation: StackNavigationProp<RootParamsList, T>;
  route: RouteProp<RootParamsList, T>;
};
