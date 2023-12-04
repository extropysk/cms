# CMS

A template for [Payload](https://github.com/payloadcms/payload) to help you get up and running quickly.

## Development

To spin up the project locally, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env`
1. Next `docker compose up postgres`
1. Next `yarn && yarn dev`
1. Now `open http://localhost:3000/admin` to access the admin panel
1. Create your first admin user using the form on the page

That's it! Changes made in `./src` will be reflected in your app.
