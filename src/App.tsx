import React, { useEffect } from 'react';
import './App.css';

import { Suspense, lazy, LazyExoticComponent } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useCreateUserMutation } from './store/api/userApi';

const Loading: LazyExoticComponent<() => JSX.Element> = lazy(
  () => import('./common/Loading')
)

const Layout: LazyExoticComponent<() => JSX.Element> = lazy(
  () => import('./components/Layout')
)

const Shop: LazyExoticComponent<() => JSX.Element> = lazy(
  () => import('./components/Shop')
)

const Cart: LazyExoticComponent<() => JSX.Element> = lazy(
  () => import('./components/Cart')
)

const Error: LazyExoticComponent<() => JSX.Element> = lazy(
  () => import('./components/Error')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { element: <Shop />, index: true },
      { path: 'cart', element: <Cart />, index: true}
    ]
  }
])

useEffect(() => {
  const fetchUser = async () => {
    const user = await useCreateUserMutation().upwrap()
    
  }

  fetchUser()
}, [])

export function App(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;
