
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/paths'
import { BrowserRouter as Router } from "react-router-dom";
function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App
