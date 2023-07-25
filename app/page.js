import Image from 'next/image'
//import styles from './page.module.css'
import { getPosts } from './api'
import Link from 'next/link';

export default async function Home() { //async because useEffect cannot be used in Server Side Rendering
  const data = await getPosts();
  return (<ul style={{listStyle:"none"}}>
    {
      Array.isArray(data) && data.map((post)=>{
        return <Link 
        key={post.node.id}
        href={`/pages/SinglePost?questionID=`+post.node.id}>
          <li>{post.node.title}</li>
        </Link>;
      })
    }
  </ul>)
}

/*

*/