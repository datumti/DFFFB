<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PathController;
use App\Http\Controllers\ProjectController;

class SetPath extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'set:path {path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets the project path.';

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
        $path = $this->argument('path');
        $prjc = new ProjectController();
        if($prjc->checkValid($path)){
            $pc = new PathController();
            $pc->setPath($path);
            echo 'Setup successful.';
        }
        else {
            echo 'ERROR: This doesn\'t seem to be a valid project .';
        }
    }
}
