export interface IHomeOffering {
  offeringName: string;
  shortDescription: string;
  thumbnail: string;
}

export interface IHomeSetting {
  type: string;
  title: string;
  description: string;
  image: string;
  menu?: any;
}
export interface IHomeRightMenu {
  id: string;
  name: string;
  type: string;
  link: string;
  shortDescription: string;
  isDefault: boolean;
}
