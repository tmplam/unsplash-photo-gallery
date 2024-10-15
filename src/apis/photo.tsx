import axios from '@/apis/axios';
import { Photo } from '@/models';

export interface ApiGetPhotosParams {
  page: number;
  per_page: number;
}

export const apiGetPhotos = (params: ApiGetPhotosParams): Promise<Photo[]> =>
  axios({
    url: '/photos',
    method: 'get',
    params,
  });

export const apiGetPhotoDetail = (photoId: string): Promise<Photo> =>
  axios({
    url: `/photos/${photoId}`,
    method: 'get',
  });
