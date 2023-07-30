import React from "react"

import { getSinglePost } from '../../api'

export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.postID));
    return <p dangerouslySetInnerHTML={{__html: postData.content}}></p>
}
