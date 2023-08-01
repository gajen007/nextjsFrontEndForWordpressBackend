import React from "react"

import { getSinglePost } from '../../../api'

export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.postID));
    
    const postCardStyle = {margin:5};

    return <div style={postCardStyle} className="card border-dark">
        <div className="card-header bg-dark text-white">
            {postData.title}
        </div>
        <div className="card-body">
            <p dangerouslySetInnerHTML={{__html: postData.content}}></p>
        </div>
    </div>
}
