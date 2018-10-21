#!/bin/bash
set -e

php artisan migrate

a2enmod rewrite

apachectl -D FOREGROUND