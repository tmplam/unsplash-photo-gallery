import { useRouteError } from 'react-router-dom';

export function Error() {
  const error = useRouteError();
  // console.log(error);
  return <div>ccc</div>;
}
