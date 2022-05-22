# Laravel - Mailing

## Installation - Composer

You can install the package via composer:

```
composer require sefirosweb/laravel-mailing
```

Or manually add this to your composer.json:

**composer.json**

```json
"sefirosweb/laravel-mailing": "*"
```

If you are using Laravel 5.5 and up, the service provider will automatically get registered.

For older versions of Laravel (<5.5), you have to add the service provider:

**config/app.php**

```php
'providers' => [
        ...
    	Sefirosweb\LaravelMailing\LaravelMailingServiceProvider::class,
]
```

Install database migrations

```
php artisan migrate
```

Publish React front and config:

```
php artisan vendor:publish --provider="Sefirosweb\LaravelMailing\LaravelMailingServiceProvider" --force
```

## <strong>Please securize this path with middleware</strong>

Easy way: `config/laravel-mailing.php`

```php
return [
    'prefix' => 'mailgroups', // Prefix path
    'middleware' => ['web', 'auth'], // Use your self auth system
    'stage_to' => env('MAIL_LIST_STAGE_TO', 'Create "MAIL_LIST_STAGE_TO" in .env with default mail'), // Used for staging area, if not are in production return this value
];

```

Extra: for the advanced access list I recommend my other package: [laravel-access-list](https://github.com/sefirosweb/laravel-access-list)
Usage:

```php
return [
    'prefix' => 'mailgroups',
    'middleware' => ['web', 'auth', 'checkAcl:mailing_edit'], // Create access list "mailing_edit" and assign to role and user
];


```

## Usage

Go to http://your_app/mailgroups

- Create mailing list

  - Name => Free text
  - Code => Free text -> used for get the mails associated
  - Description => Free text

- Associate the users with the edit button, search name and add it
- If the email to add is not a local user you can create a "Mail Group"
  - Go to Groups
  - Add new group with text and "to" email
  - Go to mailing list and add the group created

![image](https://raw.githubusercontent.com/sefirosweb/laravel-mailing/master/docs/how_to.gif)

Once you have mailing list for get the emails you can use the helper:

```php
use Sefirosweb\LaravelMailing\Http\Helpers\MailingList;

      ...
      $to = MailingList::get('mailing list');
      // Returns array
      //   $to = [
      //      0 => 'sefi@gmail.com'
      //    ]

```
