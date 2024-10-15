import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface ThumbnailProps {
  src: string;
  alt: string;
  photoId: string;
  username: string;
  userProfile: string;
}

export const Thumbnail: FunctionComponent<ThumbnailProps> = ({ src, alt, photoId, username, userProfile }) => {
  return (
    <Link
      to={`/photos/${photoId}`}
      className="h-44 rounded-lg bg-white p-1 border border-slate-200 shadow-lg shadow-slate-300 hover:scale-105 transition-transform cursor-pointer relative"
    >
      <img className="w-full h-full object-cover rounded-lg hover:brightness-75" src={src} alt={alt} />
      <div className="absolute bottom-3 left-3">
        <div className="flex items-center gap-x-2">
          <img className="w-10 h-10 border-2 rounded-full" src={userProfile} alt={username} />
          <p className="text-white">{username}</p>
        </div>
      </div>
    </Link>
  );
};
