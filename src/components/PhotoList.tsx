import { FunctionComponent } from 'react';
import { Photo } from '@/models';

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: FunctionComponent<PhotoListProps> = ({ photos }) => {
  return (
    <div className="container mx-auto">
      <div className="columns-2 md:columns-3 lg:columns-4">
        {photos.map((photo) => {
          return <img className="w-full gap-7 mb-4 rounded-lg" src={photo.urls.thumb} alt={photo.alt_description} />;
        })}
      </div>
    </div>
  );
};

export default PhotoList;
