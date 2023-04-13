import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login'
import Test from '@/views/test'
import ProtectedRoute from './protected-route'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/test',
    element: <Test />
  }
]
