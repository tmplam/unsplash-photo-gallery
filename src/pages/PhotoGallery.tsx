import { apiGetPhotos } from '@/apis';
import PhotoList from '@/components/PhotoList';
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint';
import { Photo } from '@/models';
import { useEffect, useState } from 'react';

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [breakpoint] = useTailwindBreakpoint();

  useEffect(() => {
    const getData = async () => {
      const data = await apiGetPhotos({ page: currentPage, per_page: 10 });
      setPhotos((prev) => [...prev, ...data]);
    };
    getData();
  }, [currentPage]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY > window.document.body.offsetHeight - 5) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <PhotoList photos={photos} />;
}

export default PhotoGallery;
