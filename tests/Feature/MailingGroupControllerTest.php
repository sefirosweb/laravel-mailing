<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Sefirosweb\LaravelMailing\Http\Models\MailingGroup;
use Sefirosweb\LaravelMailing\Tests\TestCase;

/**
 * NOTE: MailingGroupRequest validates `to` with `email:dns` which performs a
 * real DNS lookup. We use `gmail.com` which has stable MX records so the tests
 * do not depend on the container having resolution for custom domains.
 */
class MailingGroupControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_lists_active_groups(): void
    {
        MailingGroup::create(['name' => 'Alpha', 'to' => 'alpha@gmail.com']);
        MailingGroup::create(['name' => 'Beta',  'to' => 'beta@gmail.com']);

        $this->getJson('/mailgroups/mailing_group')
            ->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(2, 'data');
    }

    public function test_store_creates_a_group(): void
    {
        $this->postJson('/mailgroups/mailing_group', [
            'name' => 'Newsletter',
            'to' => 'news@gmail.com',
            'description' => 'weekly',
        ])->assertStatus(200);

        $this->assertDatabaseHas('mailing_groups', [
            'name' => 'Newsletter',
            'to' => 'news@gmail.com',
        ]);
    }

    public function test_store_rejects_invalid_email(): void
    {
        $this->postJson('/mailgroups/mailing_group', [
            'name' => 'Bad',
            'to' => 'not-an-email',
        ])->assertStatus(422);
    }

    public function test_update_allows_keeping_same_email_on_the_same_row(): void
    {
        // Regression: MailingGroupRequest now reads mailing_groups_id (controller's
        // convention) to exclude the current row from the `unique:to` check.
        $group = MailingGroup::create(['name' => 'Stable', 'to' => 'stable@gmail.com']);

        $this->putJson('/mailgroups/mailing_group', [
            'mailing_groups_id' => $group->id,
            'name' => 'Stable Renamed',
            'to' => 'stable@gmail.com',
        ])->assertStatus(200);

        $this->assertSame('Stable Renamed', $group->fresh()->name);
    }

    public function test_destroy_toggles_soft_delete(): void
    {
        $group = MailingGroup::create(['name' => 'Del', 'to' => 'del@gmail.com']);

        $this->deleteJson('/mailgroups/mailing_group', ['mailing_groups_id' => $group->id])
            ->assertStatus(200);
        $this->assertNotNull($group->fresh()->deleted_at);

        $this->deleteJson('/mailgroups/mailing_group', ['mailing_groups_id' => $group->id])
            ->assertStatus(200);
        $this->assertNull($group->fresh()->deleted_at);
    }
}
