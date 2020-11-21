FROM php:7.4-apache

ENV APP_DIR /var/proteinscreener

RUN apt-get update && \
    apt-get install -y gnupg2 sqlite3 unzip && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install --no-install-recommends -y nodejs build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

RUN docker-php-ext-install pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /tmp

COPY . $APP_DIR

WORKDIR $APP_DIR

RUN ./docker/setup_composer.sh

RUN yarn install

RUN yarn run build

# RUN rm -rf node_modules

RUN composer install --no-dev && \
    composer dumpautoload -o
    
COPY .env.example .env

RUN > database/database.sqlite

RUN chmod -R a+w storage/logs database

COPY public/config.example.yaml public/config.yaml

RUN rm -rf /var/www/html && \
    ln -s $APP_DIR/public /var/www/html
    
RUN a2enmod rewrite

CMD php artisan migrate --force && apachectl -D FOREGROUND

EXPOSE 80
