FROM php:7.4-apache

ENV APP_DIR /var/proteinscreener
ENV PRSCR_API_URL /api/
ENV PRSCR_CUTOFF 0.3
ENV PRSCR_DEBUG FALSE
ENV PRSCR_AUTONEXT FALSE
ENV PRSCR_QUIZFILE quiz.yaml
ENV PRSCR_LOCALES en,fi,nl

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

RUN rm -rf node_modules

RUN composer install --no-dev && \
    composer dumpautoload -o
    
COPY .env.example .env

RUN > database/database.sqlite

RUN chmod -R a+w storage/logs database

RUN rm -rf /var/www/html && \
    ln -s $APP_DIR/public /var/www/html
    
RUN a2enmod rewrite

CMD ./docker/setup_config.sh && php artisan migrate --force && apachectl -D FOREGROUND

EXPOSE 80
