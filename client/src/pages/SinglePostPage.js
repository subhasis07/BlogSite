import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function SinglePostPage(){
    
    const {id}=useParams();
    const[postInfo,setPostInfo]= useState(null);
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response =>{
            response.json().then (postinfo =>{
                setPostInfo(postInfo);
            })
        })
    },[])
    
    if(!postInfo) return '';
    return(
        <div className="postPage">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            <div className="postImg">
                <img src={`http://localhost:4000/${postInfo.cover}`}/>
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}