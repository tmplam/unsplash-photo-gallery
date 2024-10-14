import { apiGetPhotoDetail } from '@/apis';
import { Photo } from '@/models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function PhotoDetail() {
  const [isFetching, setIsFetching] = useState(false);
  const [photo, setPhoto] = useState<Photo>();
  const { photoId } = useParams();

  useEffect(() => {
    const getPhotoDetail = async () => {
      setIsFetching(true);
      const photoDetail = await apiGetPhotoDetail(photoId!);
      setPhoto(photoDetail);
      setIsFetching(false);
    };

    getPhotoDetail();
  }, [photoId]);

  return (
    <>
      {isFetching && !photo ? (
        <div className=" my-12 flex justify-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex justify-center gap-x-6 mb-6">
          <div className="sm:basis-2/3 lg:basis-1/3">
            <div className="flex items-center gap-x-4">
              <img
                className="w-12 h-12 border-2 rounded-full"
                src={photo?.user.profile_image.large}
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
                src={photo?.urls.full}
                alt={photo?.alt_description}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
