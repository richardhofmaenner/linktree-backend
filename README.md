# Linktree Clone (Backend)

This is a simple clone of [linktr.ee](https://linktr.ee). This only one part of system. The other is the frontend
which is currently in development.

## Run this clone
Just run the container from the [Docker Hub](https://hub.docker.com/repository/docker/richardhofmaenner/linktree-backend)
with the command
```bash
docker run -d richardhofmaenner/linktree-backend
```

**be aware, that you need some environment variables**<br />
You can look up these variables in the [.env.example-file](https://github.com/richardhofmaenner/linktree-backend/blob/main/.env.example).

After you started the container, you have to manually deploy the database.
```bash
# log in into your docker container and execute a shell. Replace CONTAINER_NAME with your actual name of the container
docker exec -it /bin/sh CONTAINER_NAME

#run the migration
node ace migration:run
```
Now should the database be deployed.

## About the environment variables
The first 11 variables should be self explaining. If you should have trouble to set this up, please look over at the
[AdonisJS v5 Docs](https://preview.adonisjs.com/guides/quick-start) in the corresponding sections.

The ` LOGIN_URL ` is used to redirect a user which has been logged out (or not signed in and accessing the API) to the
login page.

The ` DASHBOARD_URL ` is used to redirect the user after login to the frontend dashboard.
