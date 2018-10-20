# ProteinScreener Installation Manual

ProteinScreener consists of 2 parts that need to have dependencies installed:

## Frontend

The frontend is a Vue.js javascript application.

Prerequisites:

* npm

First, install all dependencies:

```
npm install
```

Second, build the project from source:

```
npm run build
```

## Backend

The backend is a lumen service.

Prerequisites:

* PHP 7.1+
* composer

Install the dependencies:

```
composer install --no-dev --no-suggest
```

When all installations have completed, continue with the next part.

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


