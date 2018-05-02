# Configuration

There are two configurations to take care of:

## Frontend

Copy `public/config.example.json` to `public/config.json` and modify the settings if necessary.

## Backend

The backend only needs configuration for the database. Either provide these via the environment or a .env file.

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

When the database configuration is done, run migrations:

```
php artisan migrate
```

