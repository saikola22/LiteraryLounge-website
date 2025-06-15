import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import './App.css';
import React from 'react';
import RootLayout from './RootLayout'
import {lazy, Suspense} from 'react'
import Home from './components/home/Home';
import Signup from './components/signup/signup';
import Signin from './components/signin/Signin';
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile'
import Articles from './components/articles/Articles';


import AddArticle from './components/add-article/AddArticle';
import ArticlesByAuthor from './components/article-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
import ErrorPage from './components/ErrorPage';
// np
// const Articles=lazy(()=>import('./components/articles/Articles'))
// const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))
function App() {

  const browserRouter=createBrowserRouter([{
    path:'',
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'',
        element:<Home />
      },
      {
        path:'/signup',
        element:<Signup />
      },
      {
        path:"/signin",
        element:<Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile />,
        children:[
          {
            path:'',
            element:<Navigate to='articles' />
          },
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"book/:articleId",
            element:<Article />
          }

        ]
      },
      {
        path:"/author-profile",
        element:<AuthorProfile />,
        children:[
          {
            path:'',
            element:<Navigate to='articles-by-author/:author' />
          },
          {
            path:'new-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
           
          },
          {
            path:'book/:bookId',
            element:<Article />
          }
  
        ]
      }
    ]
    
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;