<?php

namespace Sefirosweb\LaravelMailing\Tests\Feature;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Sefirosweb\LaravelMailing\Tests\TestCase;

class ServiceProviderBootTest extends TestCase
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;

    public function test_config_is_merged(): void
    {
        $this->assertSame('mailgroups', config('laravel-mailing.prefix'));
        $this->assertSame('web', config('laravel-mailing.middleware'));
    }

    public function test_migrations_run(): void
    {
        $this->assertTrue(Schema::hasTable('mailing_lists'));
        $this->assertTrue(Schema::hasTable('mailing_groups'));
    }

    public function test_routes_registered_with_prefix(): void
    {
        $mailRoutes = collect(Route::getRoutes()->getRoutes())
            ->filter(fn ($r) => str_starts_with($r->uri(), 'mailgroups'));

        $this->assertGreaterThan(0, $mailRoutes->count());
    }
}
