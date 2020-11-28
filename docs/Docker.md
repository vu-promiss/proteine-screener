# Run ProteinScreener in Docker

ProteinScreener is available as prebuilt docker image. You can run the application by calling:

```
docker run -p 80:80 --rm --name proteinscreener vupromiss/proteine-screener
```

## Configuration

Initialize the container instance with the following environment variables:

PRSCR_LOCALES=en,fi,nl
PRSCR_AUTONEXT=false
PRSCR_DEBUG=false
PRSCR_API_URL=/api/

## Data persistence

To persist the data, hook the container up with a database.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=protein
DB_USERNAME=protein
DB_PASSWORD=protein
```