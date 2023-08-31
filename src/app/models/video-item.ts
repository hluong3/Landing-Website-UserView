export interface IVideoItem {
  id: string;
  description: string;
  name: string;
  thumbnail: string;
  videoFile: string;
  link: string;
  offeringId?: string;
  fileStorageType?: string;
}

export interface IMWVideoItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}
