import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function SinglePostPage() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="postPage">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo && userInfo.id === postInfo.author._id && (
        <div className="Edit-row">
          <Link className="Edit-btn" to={`/edit/${postInfo._id}`}>Edit Post</Link>
        </div>
      )}
      <div className="postImg">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post Cover" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
