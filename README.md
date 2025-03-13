# Steps:

- database settings in .env file
- install npm (JavaScript)
- install composer (PHP)


## Database settings

- add .env with database settings

## Install JavaScript packages

```bash
npm install
```

## Install AND Update system packages

```bash
sudo apt-get update
sudo apt-get upgrade
```

### Check php

```bash
php -v
```

### Install PHP & Curl

```bash
sudo apt-get install curl
sudo apt-get install php php-curl
sudo apt-get install php-mysql
sudo apt-get install php-mbstring
```

## Download Composer

```bash
curl -sS https://getcomposer.org/installer -o composer-setup.php
```

#### Install Composer

```bash
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

##### Install the newest version of Composer on your computer

```bash
sudo composer self-update
```

#### Check composer version

```bash
composer -v
```

## Composer install

```bash
composer install
```

### Composer update

```bash
composer update
```

## Clear All

```php
php artisan optimize:clear
```
