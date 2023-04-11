import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/login',
    element: <Login />
  }
]
