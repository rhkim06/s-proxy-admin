import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login'
import Test from '@/views/test'
import ProtectedRoute from './protected-route'
import DynamicIp from '@/views/dashboard/cpn-view/dynamic-ip'
import StaticIp from '@/views/dashboard/cpn-view/static-ip'
import SmsA from '@/views/dashboard/cpn-view/sms-a'
import BadRequest from '@/views/error/404'
import MailService from '@/views/dashboard/cpn-view/MailService'
import IpCheck from '@/views/dashboard/cpn-view/ip-check'
import ImageDownload from '@/views/dashboard/cpn-view/image-server/cpn/image-download/indes'
import AdminRoute from './admin-route'
import ImageServer from '@/views/dashboard/cpn-view/image-server'
import ImageManagement from '@/views/dashboard/cpn-view/image-server/cpn/image-management'

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
        element: <Navigate to="ip-check" />
      },
      {
        path: 'dynamic-ip',
        element: (
          <AdminRoute>
            <DynamicIp />
          </AdminRoute>
        )
      },
      {
        path: 'static-ip',
        element: (
          <AdminRoute>
            <StaticIp />
          </AdminRoute>
        )
      },
      {
        path: 'sms-a',
        element: (
          <AdminRoute>
            <SmsA />
          </AdminRoute>
        )
      },
      {
        path: 'mail-service',
        element: (
          <AdminRoute>
            <MailService />
          </AdminRoute>
        )
      },
      {
        path: 'ip-check',
        element: <IpCheck />
      },

      {
        path: 'image-server',
        element: (
          <AdminRoute>
            <ImageServer />
          </AdminRoute>
        )
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
  },
  {
    path: '*',
    element: <BadRequest />
  }
]
