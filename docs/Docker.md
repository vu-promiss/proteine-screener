# Run ProteinScreener in Docker

ProteinScreener is available as prebuilt docker image. You can run the application by calling:

```
docker run -p 80:80 --rm --name proteinscreener vupromiss/proteine-screener
```

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