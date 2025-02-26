import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Logs = lazy(() => import('./pages/Logs'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
