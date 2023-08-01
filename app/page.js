import Image from 'next/image'
//import styles from './page.module.css'
import { getPosts } from './api'
import Link from 'next/link';
import PostGrid from './components/postGrid';
export default async function Home() { //async because useEffect cannot be used in Server Side Rendering
  const data = await getPosts();
  return (<div className="row">
    {
      Array.isArray(data) && data.map((post)=>{
        return <div className='col-lg-3' key={post.node.id}>
          <PostGrid
              postId={post.node.id}
              postHeading={post.node.title}
              postBegining={post.node.excerpt}
            />
          </div>;
      })
    }
  </div>)
}