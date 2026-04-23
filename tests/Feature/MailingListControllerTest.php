<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelMailing\Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Sefirosweb\LaravelMailing\Http\Models\MailingGroup;
use Sefirosweb\LaravelMailing\Http\Models\MailingList;
use Sefirosweb\LaravelMailing\Tests\TestCase;

class MailingListControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_returns_active_mailing_lists(): void
    {
        MailingList::create(['name' => 'Weekly', 'code' => 'weekly', 'description' => 'w']);
        MailingList::create(['name' => 'Daily',  'code' => 'daily',  'description' => 'd']);

        $this->getJson('/mailgroups/mailing_list')
            ->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(2, 'data');
    }

    public function test_get_with_status_deleted_returns_only_trashed(): void
    {
        $a = MailingList::create(['name' => 'A', 'code' => 'a']);
        MailingList::create(['name' => 'B', 'code' => 'b']);
        $a->delete();

        $this->getJson('/mailgroups/mailing_list?status=deleted')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.code', 'a');
    }

    public function test_store_creates_a_mailing_list(): void
    {
        $this->postJson('/mailgroups/mailing_list', [
            'name' => 'Newsletter',
            'code' => 'newsletter',
            'description' => 'monthly',
        ])->assertStatus(200)->assertJson(['success' => true]);

        $this->assertDatabaseHas('mailing_lists', [
            'name' => 'Newsletter',
            'code' => 'newsletter',
        ]);
    }

    public function test_store_rejects_duplicate_code(): void
    {
        MailingList::create(['name' => 'First', 'code' => 'dup']);

        $this->postJson('/mailgroups/mailing_list', [
            'name' => 'Second',
            'code' => 'dup',
        ])->assertStatus(422);
    }

    public function test_update_modifies_existing_mailing_list(): void
    {
        $list = MailingList::create(['name' => 'Old', 'code' => 'old']);

        $this->putJson('/mailgroups/mailing_list', [
            'mailing_lists_id' => $list->id,
            'name' => 'Renamed',
            'code' => 'old',
        ])->assertStatus(200);

        $this->assertSame('Renamed', $list->fresh()->name);
    }

    public function test_destroy_soft_deletes_then_restores(): void
    {
        $list = MailingList::create(['name' => 'Temp', 'code' => 'temp']);

        $this->deleteJson('/mailgroups/mailing_list', ['mailing_lists_id' => $list->id])
            ->assertStatus(200);
        $this->assertNotNull($list->fresh()->deleted_at);

        // Calling destroy again on a trashed row must restore it.
        $this->deleteJson('/mailgroups/mailing_list', ['mailing_lists_id' => $list->id])
            ->assertStatus(200);
        $this->assertNull($list->fresh()->deleted_at);
    }

    public function test_add_and_delete_user_manage_pivot(): void
    {
        $list = MailingList::create(['name' => 'Pivot', 'code' => 'pivot']);
        $user = User::create(['name' => 'Alice', 'email' => 'alice@test.local']);

        $this->postJson('/mailgroups/mailing_list/users', [
            'mailing_lists_id' => $list->id,
            'user_id' => $user->id,
        ])->assertStatus(200);

        $this->assertDatabaseHas('mailing_list_user', [
            'mailing_list_id' => $list->id,
            'user_id' => $user->id,
        ]);

        $this->deleteJson('/mailgroups/mailing_list/users', [
            'mailing_lists_id' => $list->id,
            'user_id' => $user->id,
        ])->assertStatus(200);

        $this->assertDatabaseMissing('mailing_list_user', [
            'mailing_list_id' => $list->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_add_and_delete_group_manage_pivot(): void
    {
        $list = MailingList::create(['name' => 'L', 'code' => 'l']);
        $group = MailingGroup::create(['name' => 'G', 'to' => 'g@acme.test']);

        $this->postJson('/mailgroups/mailing_list/groups', [
            'mailing_lists_id' => $list->id,
            'mailing_groups_id' => $group->id,
        ])->assertStatus(200);

        $this->assertDatabaseHas('mailing_group_mailing_list', [
            'mailing_list_id' => $list->id,
            'mailing_group_id' => $group->id,
        ]);

        $this->deleteJson('/mailgroups/mailing_list/groups', [
            'mailing_lists_id' => $list->id,
            'mailing_groups_id' => $group->id,
        ])->assertStatus(200);

        $this->assertDatabaseMissing('mailing_group_mailing_list', [
            'mailing_list_id' => $list->id,
            'mailing_group_id' => $group->id,
        ]);
    }

    public function test_get_users_returns_attached_users(): void
    {
        $list = MailingList::create(['name' => 'WithUsers', 'code' => 'wu']);
        $user = User::create(['name' => 'Bob', 'email' => 'bob@test.local']);
        $list->users()->attach($user->id);

        $this->getJson('/mailgroups/mailing_list/users?mailing_lists_id=' . $list->id)
            ->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Bob');
    }

    public function test_get_array_groups_returns_all_groups_with_value_alias(): void
    {
        MailingGroup::create(['name' => 'Alpha', 'to' => 'alpha@acme.test']);
        MailingGroup::create(['name' => 'Beta',  'to' => 'beta@acme.test']);

        $this->getJson('/mailgroups/mailing_list/groups/get_array')
            ->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure(['data' => [['id', 'value', 'name']]]);
    }
}
