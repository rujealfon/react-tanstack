import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

/**
 * Root React component that renders the router provider
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
