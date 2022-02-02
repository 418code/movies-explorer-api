# movies-explorer-api
## Description

Node/Express/MongoDB back end for React movie search front end

## Live deployment

[https://api.movies.418co.de](https://api.movies.418co.de)

## Run the project locally

`npm ci` — install packages with exact versions \
`npm run start` — starts the server   
`npm run dev` — starts the server with hot-reload

## Technologies used
- Node, Express: middlewares, routers, controllers, REST api, error handling
- MongoDB, Mongoose: schemas, models, CRUD operations, refs, statics
- Security: bcrypt password hashing, Celebrate/Joi + MongoDB validation with regex matching, JWT token, http only cookies, rate limiter, winston loggers, .env production variables, pinned npm package versions
- Google Compute Platform: debian VM, Nginx with proxy pass, PM2 with auto reload, Let's Encrypt SSL certificate, dynamic DNS, custom domain

