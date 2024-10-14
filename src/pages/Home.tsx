import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex justify-center mt-8">
      <Link
        to="/photos"
        className="px-6 py-2 rounded-md bg-violet-500 hover:bg-violet-600 transition-colors text-white font-medium shadow-xl"
      >
        View photos
      </Link>
    </div>
  );
}
