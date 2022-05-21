<?php

namespace Sefirosweb\LaravelMailing\Commands;

use Illuminate\Console\Command;

class DispatchMailJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mailgroup:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show all mailing groups';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        logger('Executing commands');
    }
}
