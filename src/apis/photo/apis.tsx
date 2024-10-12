import { AxiosResponse } from 'axios';
import axios from '@/apis/axios';
import { Photo } from '@/models';
import { ApiGetPhotosParams } from './params';

export const apiGetPhotos = (params: ApiGetPhotosParams): Promise<AxiosResponse<Photo[]>> =>
  axios({
    url: '/photos',
    method: 'get',
    params,
  });

export const apiGetPhotoDetail = (photoId: string): Promise<AxiosResponse<Photo>> =>
  axios({
    url: `/photos/${photoId}`,
    method: 'get',
  });
