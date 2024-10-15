import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiGetPhotos } from '@/apis';
import { Photo } from '@/models';
import { Thumbnail } from '@/components';

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch images when page changes
  useEffect(() => {
    const getData = async () => {
      setIsFetching(true);
      try {
        const data = await apiGetPhotos({ page: currentPage, per_page: 12 });
        if (data) {
          setPhotos((prev) => [...prev, ...data]);
        }
      } catch {
        // Do something when error
        toast(`Page ${currentPage} forbidden!`, {
          type: 'error',
        });
      }
      setIsFetching(false);
    };
    getData();
  }, [currentPage]);

  // Fetch new page when scrolling to the bottom
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
      <div>
        <Link
          to="/"
          className="inline-block mb-4 px-6 py-2 rounded-md bg-violet-500 hover:bg-violet-600 transition-colors text-white font-medium shadow-xl"
        >
          Back to home
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo) => {
          return (
            <Thumbnail
              key={photo.id}
              src={photo.urls.regular}
              alt={photo.alt_description}
              photoId={photo.id}
              username={photo.user.name}
              userProfile={photo.user.profile_image.medium}
            />
          );
        })}
      </div>
      {isFetching && (
        <div className=" my-20 flex justify-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
