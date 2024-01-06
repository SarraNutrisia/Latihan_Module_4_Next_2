
import './App.css'
import { HomeContainer, RegisterContainer, LoginContainer, ListContainer, ProtectContainer } from './containers';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ProtectLayout from './layouts/ProtectLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomeContainer />
        },
        {
          path: '/register',
          element: <RegisterContainer />
        },
        {
          path: '/login',
          element: <LoginContainer />
        },
        {
          path: '/list-detail/:id',
          element: <ListContainer />
        },

      ]
    },
    {
      path: '*',
      element: <h1>404</h1>
    },
    {
      element: <ProtectLayout />,
      children: [
        {
          path: '/protect',
          element: <ProtectContainer />
        },
      ]
    }
  ])

  return (
    <div className="app">
      <RouterProvider router={router} />
      {/*<BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path='/' element={<HomeContainer />}/>
            <Route path='/register' element={<RegisterContainer />}/>
            <Route path='/login' element={<LoginContainer />}/>
          </Route>
          <Route path='*' element={<h1>404</h1>}/>
        </Routes>
      </BrowserRouter>*/}
    </div>
    
    //<div className="app">
    //  <HomeContainer />
    //</div>
  )
}

export default App
