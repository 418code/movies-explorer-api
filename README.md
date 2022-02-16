# movies-explorer-api
## Description

Node/Express/MongoDB back end for React movie search front end

## Live deployment

[https://api.movies.418co.de](https://api.movies.418co.de) \
\
`npm ci` — install packages with exact versions \
`pm2 init simple` — creates a ecosystem.config.js file for pm2 to pass .env variables \
`node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"` — generates JWT secret key \
fill ecosystem.config.js variables: NODE_ENV, PORT, JWT_SECRET, MONGO_URL
fill ecosystem.config.js name and script values
`pm2 start/stop/restart ecosystem.config.js` — manage application run state with pm2 \
`pm2 save` — save pm2 running state to auto restart the app


## Run the project locally

`npm ci` — install packages with exact versions \
`npm run start` — starts the server   
`npm run dev` — starts the server with hot-reload \
for testing production environment add movies.env with NODE_ENV, PORT, JWT_SECRET, MONGO_URL variables set

## Technologies used
- Node, Express: middlewares, routers, controllers, REST api, error handling
- MongoDB, Mongoose: schemas, models, CRUD operations, refs, statics
- Security: bcrypt password hashing, Celebrate/Joi + MongoDB validation with regex matching, JWT token, http only cookies, rate limiter, winston loggers, .env production variables, pinned npm package versions
- Google Compute Platform: debian VM, Nginx with proxy pass, PM2 with auto reload, Let's Encrypt SSL certificate, dynamic DNS, custom domain

