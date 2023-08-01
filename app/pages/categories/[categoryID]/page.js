import React from "react"

import { getPostsOfCategory } from '../../../api'
import PostGrid from '../../../components/postGrid';

export default async function Page({ params, searchParams }) {
    const postsOfCategory = await getPostsOfCategory(decodeURIComponent(params.categoryID));
    return (<div className="row">
    {
      Array.isArray(postsOfCategory) && postsOfCategory.map((post)=>{
        return <div className='col-lg-3' key={post.node.id}>
          <PostGrid
              postId={post.node.id}
              postHeading={post.node.title}
              postBegining={post.node.excerpt}
            />
          </div>;
      })
    }
  </div>);
}
