# bro-app

## Requirements

## Run app

Setup backend image using script:

```
./backend-image-setup.sh
```

This script creates an image for a backend application named `bro-backend:0.1`.

To start services:

```
docker compose up -d keycloak keycloak-db bro-backend
```
