const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPItest(query, { variables } = {}) {
  /*
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const txt = await res.text()
  return txt;
  //const json = await res.json()
  //const err =  json.errors;
  //return err[0].message;
  */
}

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    
    /*
    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers[
        'Authorization'
      ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }
    */

    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
  }

export async function getPosts(){
  const data = await fetchAPI(
        `query AllPosts {
          posts(first: 20) {
            edges {
              node {
                id
                title
                categories{
                edges{
                    node{
                    name
                    }
                }
                }
                excerpt
                slug
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
      `,
        {
          variables: {},
        }
      );
    return data?.posts?.edges;
}

export async function getSinglePost(postID){
  const data = await fetchAPI(`
  query getSinglePost($id:ID!){
    post(id:$id){           
          title
          categories{
          edges{
              node{
              name
              }
          }
          }
          excerpt
          content
          slug
          id
          author {
            node {
              name
              firstName
              lastName
            }
          }
    }
  }`,{variables:{"id":postID}});
  return data?.post;
}

/*
{
  getThisBook(bookID:3){
    id
    name
    author {
      name
    }
  }
}
*/