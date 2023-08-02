import React from "react"
import Link from "next/link"
import { getSinglePost } from '../../../api'
import SimilarPostGrid from "@/app/components/similarPostGrid";
export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.postID));
    //const categoriesWithPosts = postData.categories.edges;
    const getSimilarPosts=()=>{
        var similarPosts=[];
        var got=[];
        postData.categories.edges.forEach((cat)=>{
            cat.node.posts.edges.forEach((post)=>{
                if (!got.includes(post.node.id)&&postData.id!==post.node.id) {
                    similarPosts.push(post);
                    got.push(post.node.id);
                }
            });
        });
        return similarPosts;
    };
    
    const relatedPosts = getSimilarPosts();

    return <div style={{margin:5}}>
    <div className="row">
        <div className="col-lg-12">
        <div className="card border-dark">
            <div className="card-header bg-dark text-white">{postData.title}</div>
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
                    return <li key={comment.id} style={{marginTop:5}} >
                        <span style={{fontWeight:'bold'}}>{comment.author.node.name}</span>:
                        <span dangerouslySetInnerHTML={{__html: comment.content}}></span>
                    </li>
                })
            }
            </ul>
        </div>
    </div>
        </div>
    </div>
        <div className="row">
                {
                Array.isArray(relatedPosts) && relatedPosts.map((similarPost)=>{
                    return <div className="col-lg-3" key={similarPost.node.id}><SimilarPostGrid postHeading={similarPost.node.title} postId={similarPost.node.id}/></div>
                })
                }
        </div>
    </div>
}