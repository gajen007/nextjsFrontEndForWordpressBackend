Setup your Wordpress backend as usual with the WP-GraphQL plugin.

https://www.section.io/engineering-education/create-a-headless-cms-website-using-wordpress-nextjs-and-graphql
See this article for more info: (Do not follow this article for front-end; because it is old version of Next.js since Next.js 13 this repo is created)

Make .env file & mention it in your .gitignore

place the graphql's URL in the .env file as ...

WORDPRESS_API_URL=http://YOUR_WORDPRESS_ROUTE/index.php?graphql

You can find your graohql url via "/wp-admin" route in your wordpress dashboard; check it with /index.php?graphql

That's all.
