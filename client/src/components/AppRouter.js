import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from "../utils/const";
import { Context } from "../index";
import '../css/AppRouter.css';

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log('user.isAuth в AppRouter:', user.isAuth)  // ← ДОБАВИТЬ
  return (
    <div className='style-page'>
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
    </div>
  );

  /*return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route 
          key={path} 
          path={path} 
          element={<Component />}  // Обратите внимание на <Component />
        />
      ))}
      
      {user.isAuth && authRoutes.map(({ path, Component }) => (
        <Route 
          key={path} 
          path={path} 
          element={<Component />}  // Обратите внимание на <Component />
        />
      ))}
      
      <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />} />
    </Routes>
  );*/
};

export default AppRouter;