import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from '@/views/dashboard'
import Login from '@/views/login'
import Test from '@/views/test'
import ProtectedRoute from './protected-route'
import DynamicIp from '@/views/dashboard/cpn-view/dynamic-ip'
import StaticIp from '@/views/dashboard/cpn-view/static-ip'
import SmsA from '@/views/dashboard/cpn-view/sms-a'
import BadRequest from '@/views/404'
import MailService from '@/views/dashboard/cpn-view/MailService'
import IpCheck from '@/views/dashboard/cpn-view/ip-check'

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
      },
      {
        path: 'sms-a',
        element: <SmsA />
      },
      {
        path: 'mail-service',
        element: <MailService />
      },
      {
        path: 'ip-check',
        element: <IpCheck />
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
