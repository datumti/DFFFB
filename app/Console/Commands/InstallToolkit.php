<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PathController;

class InstallToolkit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:toolkit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Installs some front-end toolkit.';

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
        $prjc = new ProjectController();
        $pc = new PathController();
        $prj = $prjc->getModel($pc->getPath());

        switch ($prj->toolkit) {
            case "bootstrap":
                echo "You choose bootstrap!";
                break;
            case "materialize":
                echo "You choose materialize!";
                break;
            default:
                echo "Opção inválida. Tente 'bootstrap' ou 'materialize'.";
        }
    }
}
