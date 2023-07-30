import React from "react"

import { getSinglePost } from '../../../api'

export default async function Page({ params, searchParams }) {
    const postData = await getSinglePost(decodeURIComponent(params.id));
    return <p >{postData.excerpt}</p>
}
