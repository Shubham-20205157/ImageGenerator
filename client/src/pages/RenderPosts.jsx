import React from 'react'
import { Cards } from '../components'

const RenderPosts = ({data,title}) => {
  if(data.length>0){
    // simply return the all the data of the search post.
    return (

        data.map((post)=><Cards key = {post._id} {...post}/>)
    )
  }
  return (
    <h2 className = "mt-5 font-bold text-[#6449ff] text-xl-uppercase">{title}</h2>
  )
}

export default RenderPosts