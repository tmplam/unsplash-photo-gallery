import { useEffect, useState } from 'react';
import { apiGetPhotos } from '@/apis';
import { Photo } from '@/models';
import Thumbnail from '@/components/Thumbnail';
import useTailwindBreakpoint, { tailwindBreakPoints } from '@/hooks/useTailwindBreakpoint';

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [breakpoint] = useTailwindBreakpoint();

  const photosByColumns = (() => {
    if (breakpoint === tailwindBreakPoints.xs) {
      return [[]] as Photo[][];
    } else if (breakpoint === tailwindBreakPoints.sm) {
      return [[], []] as Photo[][];
    } else if (breakpoint === tailwindBreakPoints.md) {
      return [[], [], []] as Photo[][];
    }
    return [[], [], [], []] as Photo[][];
  })();

  for (let i = 0; i < photos.length; i++) {
    const column = i % photosByColumns.length;
    photosByColumns[column].push(photos[i]);
  }

  useEffect(() => {
    const getData = async () => {
      setIsFetching(true);
      const data = await apiGetPhotos({ page: currentPage, per_page: 12 });
      if (data) {
        setPhotos((prev) => [...prev, ...data]);
      }
      setIsFetching(false);
    };
    getData();
  }, [currentPage]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY > window.document.body.offsetHeight - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="flex space-x-4">
        {photosByColumns.map((photos, index) => {
          return (
            <div key={index} className="flex-1 flex flex-col space-y-4">
              {photos.map((photo) => {
                return (
                  <Thumbnail
                    key={photo.id}
                    src={photo.urls.full}
                    alt={photo.alt_description}
                    photoId={photo.id}
                    username={photo.user.name}
                    userProfile={photo.user.profile_image.large}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {isFetching && (
        <div className=" my-12 flex justify-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
