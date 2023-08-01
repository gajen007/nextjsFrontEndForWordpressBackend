const API_URL = process.env.WORDPRESS_API_URL;

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

  async function examineGraphQlquery(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const txt = await res.json()
    return txt.errors;
  }


export async function getCategories(){
  const data = await fetchAPI(
    `query getAllCategories {
      categories{
        edges{
          node{
            categoryId
            name
          }
        }
      }
    }`,{
      variables: {},
    }
  );
  return data?.categories?.edges;
}

export async function getPostsOfCategory(categoryID){
  const intCatID=parseInt(categoryID);
  const data = await fetchAPI(
    `query postsOfCategory($categoryId:Int!) {
      posts(where:{categoryId:$categoryId}) {
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
  `,{variables:{"categoryId":intCatID}}
  );
  return data?.posts?.edges;
}

export async function getPosts(){
  const data = await fetchAPI(
        `query AllPosts {
          posts(first: 100) {
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
          comments(first: 100) {
            nodes {
              id
              content
              author {
                  node {
                    name
                  }
                }
            }
          }
    }
  }`,{variables:{"id":postID}});
  return data?.post;
}