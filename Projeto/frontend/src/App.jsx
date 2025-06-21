// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Login />} />

    //     {/* Rotas protegidas por token */}
    //     <Route element={<PrivateRoute />}>
    //       <Route path="/usuario" element={<UserPage />} />
    //     </Route>

    //     {/* Apenas admin pode acessar */}
    //     <Route element={<PrivateRoute />}>
    //       <Route path="/admin" element={<AdminPage />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <UserPage/>
  );
}

export default App;
