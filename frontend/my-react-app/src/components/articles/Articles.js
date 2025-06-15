import React from 'react';
import {useState,useEffect} from 'react';
import { axiosWithToken } from '../../axiomsWithToken';
import {useNavigate,Outlet} from 'react-router-dom'

function Articles() {

  const [articlesList, setArticlesList] = useState([]);
  let navigate=useNavigate()

  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/books`)
    console.log(res)
    setArticlesList(res.data.payload)
  }


  const readArticleByArticleId=(articleObj)=>{
    console.log(articleObj)
    navigate(`../book/${articleObj.articleId}`,{state:articleObj})
  }


    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])



  return (
    <div>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
      {articlesList.map((book) => (
        <div className="col" key={book.articleId}>
          <div className="card h-100 w-100">
            <div className="card-body text-center">
              <h5 className="card-title ">{book.title}</h5>
              <div>
              <img src={book.link} className='img-fluid m-2' height="100px"width="100px"/>
              </div>
              <button className="custom-btn btn-4 " onClick={()=>readArticleByArticleId(book)}>
                <span>Read More</span>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated on {book.dateOfModification}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Outlet />
  </div>
  )
}

export default Articles