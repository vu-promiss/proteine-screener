FROM php:7.2-apache

ENV APP_DIR /var/proteinscreener

RUN apt-get update && \
    apt-get install -y gnupg2 sqlite3 unzip && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install --no-install-recommends -y nodejs build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /tmp
ENV COMPOSER_VERSION 1.6.3

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php --no-ansi --install-dir=/usr/bin --filename=composer --version=${COMPOSER_VERSION} \
    && php -r "unlink('composer-setup.php');"
 
COPY . $APP_DIR

WORKDIR $APP_DIR

RUN npm install

RUN npm run build

RUN rm -rf node_modules

RUN composer install --no-dev && \
    composer dumpautoload -o
    
COPY .env.example .env

RUN > database/database.sqlite

RUN chmod -R a+w storage/logs database

COPY public/config.example.json public/config.json

RUN rm -rf /var/www/html && \
    ln -s $APP_DIR/public /var/www/html
    
RUN a2enmod rewrite

CMD php artisan migrate --force && apachectl -D FOREGROUND

EXPOSE 80
