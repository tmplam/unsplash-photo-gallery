import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="py-4">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold">Photo Gallery</h1>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p>
              Styling library:{' '}
              <a className="text-violet-600" href="https://tailwindcss.com/">
                Tailwindcss
              </a>
            </p>
            <p>
              Sponsored by:{' '}
              <a className="text-violet-600" href="https://unsplash.com/">
                Unsplash
              </a>
            </p>
          </div>
          <div>
            <p className="hidden sm:inline-block">
              <span className="font-medium">Author:</span> <span className="hidden md:inline">21120492 - </span>Trần Mỹ
              Phú Lâm
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
