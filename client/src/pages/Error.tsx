import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oh no!</h1>
      <p>You've been sent to the pentaly box due to an unknown error.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}