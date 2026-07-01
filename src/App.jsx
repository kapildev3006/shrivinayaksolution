import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '@components/layout/RootLayout'

// Lazy loaded pages
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Services = lazy(() => import('@pages/Services'))
const Gallery = lazy(() => import('@pages/Gallery'))
const Contact = lazy(() => import('@pages/Contact'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Admin Pages
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'))
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'))
const AdminHomePage = lazy(() => import('./admin/pages/AdminHomePage'))
const AdminAboutPage = lazy(() => import('./admin/pages/AdminAboutPage'))
const AdminServicesPage = lazy(() => import('./admin/pages/AdminServicesPage'))
const AdminGalleryPage = lazy(() => import('./admin/pages/AdminGalleryPage'))
const AdminContactPage = lazy(() => import('./admin/pages/AdminContactPage'))
const AdminSettingsPage = lazy(() => import('./admin/pages/AdminSettingsPage'))

import { DataProvider } from './context/DataContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true,        element: <Home /> },
      { path: 'about',      element: <About /> },
      { path: 'services',   element: <Services /> },
      { path: 'gallery',    element: <Gallery /> },
      { path: 'contact',    element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'home', element: <AdminHomePage /> },
      { path: 'about', element: <AdminAboutPage /> },
      { path: 'services', element: <AdminServicesPage /> },
      { path: 'gallery', element: <AdminGalleryPage /> },
      { path: 'contact',  element: <AdminContactPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
    ],
  },
])

// A premium loading fallback spinner
const LoadingFallback = () => (
  <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
  </div>
)

export default function App() {
  return (
    <DataProvider>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </DataProvider>
  )
}
