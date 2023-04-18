import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login'
import Test from '@/views/test'
import ProtectedRoute from './protected-route'
import DynamicIp from '@/views/dashboard/cpn-view/dynamic-ip'
import StaticIp from '@/views/dashboard/cpn-view/static-ip'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="dynamic-ip" />
      },
      {
        path: 'dynamic-ip',
        element: <DynamicIp />
      },
      {
        path: 'static-ip',
        element: <StaticIp />
      }
    ]
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
