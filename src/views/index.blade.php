<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('vendor/laravel-mailing/css/app.css') }}" />
    <title>{{ config('app.name') }} - Mailing Groups System</title>
</head>

<body>
    <div id="root"></div>
    <script>
        window.APP_PREFIX = '{{ config('laravel-mailing.prefix') }}'
        window.APP_URL = '{{ config('app.url') }}/' + APP_PREFIX
    </script>

    <script src="{{ asset('vendor/laravel-mailing/js/app.js') }}"></script>
</body>

</html>