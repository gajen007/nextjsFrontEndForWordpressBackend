import React from "react"
import Link from "next/link"
import { getSinglePost } from '../../../api'

export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.postID));
    const postCardStyle = {margin:5};

    return <div style={postCardStyle} className="card border-dark">
        <div className="card-header bg-dark text-white">
            {postData.title}
        </div>
        <div className="card-body">
            <div className="row" style={{marginBottom:5}}>
                <div className="col-lg-12">
                {
                    Array.isArray(postData.categories.edges) && postData.categories.edges.map((category)=>{
                        return <span key={category.node.categoryId} className="bg-dark text-white" style={{marginLeft:5,padding:5,borderRadius:25}}>
                                <Link style={{ textDecoration: 'none' }} href={`/pages/categories/${category.node.categoryId}`}>{category.node.name}</Link>
                        </span>
                    })
                }
                </div>
            </div>
            <div className="row" style={{marginBottom:5}}>
                <div className="col-lg-12"  dangerouslySetInnerHTML={{__html: postData.content}}></div>
            </div>
        </div>
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
