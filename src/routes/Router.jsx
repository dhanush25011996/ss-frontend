import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { Layout } from '../components/layout';
import {
  Dashboard,
  Login,
  BlogFeed,
  Achievements
} from '../pages';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

const Router = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Private Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/blog"
        element={
          <PrivateRoute>
            <Layout>
              <BlogFeed />
            </Layout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/achievements"
        element={
          <PrivateRoute>
            <Layout>
              <Achievements />
            </Layout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/streak"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/quotes"
        element={
          <PrivateRoute>
            <Layout>
              <BlogFeed />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Root redirect */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default Router;
