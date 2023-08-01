import React from "react"

import { getSinglePost } from '../../../api'

export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.postID));
    const postCardStyle = {margin:5};

    return <div style={postCardStyle} className="card border-dark">
        <div className="card-header bg-dark text-white">
            {postData.title}
        </div>
        <div className="card-body" dangerouslySetInnerHTML={{__html: postData.content}}></div>
        <div className="card-footer">
            <span>Comments</span>
            <ul style={{listStyle:'none'}}>
            {
                Array.isArray(postData.comments.nodes) && postData.comments.nodes.map((comment)=>{
                    return <li style={{marginTop:5}} >
                        <span style={{fontWeight:'bold'}}>{comment.author.node.name}</span>:
                        <span dangerouslySetInnerHTML={{__html: comment.content}}></span>
                    </li>
                })
            }
            </ul>
        </div>
    </div>
}
