<?php

namespace Sefirosweb\LaravelMailing;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Sefirosweb\LaravelMailing\Commands\DispatchMailJob;

class LaravelMailingServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'mailgroup');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->mergeConfigFrom(__DIR__ . '/config/config.php', 'laravel-mailing');
        $this->registerRoutes();

        $this->publishes([
            __DIR__ . '/../public/vendor/laravel-mailing' => public_path('vendor/laravel-mailing'),
        ], 'view');

        $this->publishes([
            __DIR__ . '/config/config.php' => config_path('laravel-mailing.php'),
        ], 'config');

        if ($this->app->runningInConsole()) {
            $this->commands([
                DispatchMailJob::class
            ]);
        }
    }


    protected function registerRoutes()
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        });
    }
    protected function routeConfiguration()
    {
        return [
            'prefix' => config('laravel-mailing.prefix'),
            'middleware' => config('laravel-mailing.middleware'),
        ];
    }


    public function register()
    {
    }
}
