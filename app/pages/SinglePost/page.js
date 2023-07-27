import React from "react"

import { getSinglePost } from '../../api'

export default async function SinglePost() {
    //How to get questionID from route ?
    
    const postData = await getSinglePost("cG9zdDo3NDk=");
    //  cG9zdDo3NDk=
    // const singlePostData = await getSinglePost("cG9zdDo3NDk=");
    // console.log(singlePostData);

    return <p>{postData.excerpt}</p>
}