import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiGetPhotoDetail } from '@/apis';
import { Photo } from '@/models';
import { AxiosError } from 'axios';

export function PhotoDetail() {
  const [isFetching, setIsFetching] = useState(false);
  const [photo, setPhoto] = useState<Photo>();
  const { photoId } = useParams();

  // Fetch photo detail
  useEffect(() => {
    const getPhotoDetail = async () => {
      setIsFetching(true);
      try {
        const photoDetail = await apiGetPhotoDetail(photoId!);
        setPhoto(photoDetail);
      } catch (error) {
        // Do something when error
        const axiosError = error as AxiosError;
        let errMessage = 'Some unexpected error happened!';
        if (axiosError.status == 403) {
          errMessage = 'You have exceeded limit request this hour!';
        } else if (axiosError.status == 404) {
          errMessage = `Photo with id ${photoId} not found!`;
        }

        toast(errMessage, {
          type: 'error',
        });
      }
      setIsFetching(false);
    };

    getPhotoDetail();
  }, [photoId]);

  return (
    <>
      <div>
        <Link
          to="/photos"
          className="inline-block mb-4 px-6 py-2 rounded-md bg-violet-500 hover:bg-violet-600 transition-colors text-white font-medium shadow-xl"
        >
          Photo gallery
        </Link>
      </div>
      {isFetching && !photo && (
        <div className="my-12 flex justify-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isFetching && photo && (
        <div className="flex justify-center gap-x-6 mb-6">
          <div className="sm:basis-2/3 lg:basis-1/3">
            <div className="flex items-center gap-x-4">
              <img
                className="w-12 h-12 border-2 rounded-full"
                src={photo?.user.profile_image.medium}
                alt={photo?.alt_description}
              />
              <div>
                <p className="font-medium">{photo?.user.name}</p>
                <p className="">
                  Total likes: {photo?.user.total_likes}, Total photos: {photo?.user.total_photos}
                </p>
              </div>
            </div>
            <div className="mt-2 mb-1">{photo?.alt_description}</div>
            <div>
              <img
                className="w-full rounded-lg shadow-2xl border-4"
                src={photo?.urls.regular}
                alt={photo?.alt_description}
              />
            </div>
          </div>
        </div>
      )}
      {!isFetching && !photo && (
        <div className="text-center">
          <p className="text-6xl font-medium">ERROR</p>
          <p className="text-xl">Error happened!</p>
        </div>
      )}
    </>
  );
}
