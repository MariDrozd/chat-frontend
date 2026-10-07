import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './app/providers/router/router';
import { ErrorBoundary } from './shared/ui/error-boundary';

function App() {
  return (
    <ErrorBoundary onError={(error) => console.error('UI error', error)}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
