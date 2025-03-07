import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div id="error-page" style={{ minHeight: '100vh', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(https://media.istockphoto.com/id/481538109/photo/ice-hockey-referee.jpg?s=1024x1024&w=is&k=20&c=sPGn8eB_bC51zSirTvkH4AzoTf3nB4z8diULYhuLrrY=)' }}>
      <div style={{ textAlign: 'center', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
        <h1>Oh no!</h1>
        <p>You've been sent to the penalty box due to the following error:</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
