// types.ts
export type RowMeta = {
  index: number;
  presetname: string;
  feedurl: string;
};
export type RootStackParamList = {
  Home: undefined;
  Shows: undefined;
  Live: undefined;
  Teachers: undefined;
  Search: undefined;
  DetailScreen: { item: any; imageUri?: string; source?: string };
  Movies: undefined;
  AllTeachers: undefined;
};
