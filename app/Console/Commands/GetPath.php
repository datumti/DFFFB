<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PathController;

class GetPath extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:path';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Returns the project path.';

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
        $pc = new PathController();
        echo $pc->getPath();
    }
}
