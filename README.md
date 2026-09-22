# portfolio
Portfolio website developed using NextJS

## Run with Docker Compose

This project includes separate Docker targets for development and production.

### Development

Build and start the development container:

```bash
docker compose build
docker compose up
```

The development container uses the `dev` target from the Dockerfile and runs `npm run dev`.

### Production

Build the production image without cache:

```bash
docker compose build --no-cache
```

Then start the production container:

```bash
docker compose up
```

The production container uses the `production` target from the Dockerfile and runs `npm start`.

### Notes

- The production setup does not mount the source folder, so the built `.next` output stays available inside the container.
- If you want to rebuild after changing dependencies or code, run `docker compose build --no-cache` again.
