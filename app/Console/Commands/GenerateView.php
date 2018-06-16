<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PathController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ViewController;

class GenerateView extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:view {view} {component}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria uma nova view especificada.';

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
        $prjc = new ProjectController();
        $framework = $prjc->getModel($pc->getPath())->framework;
        $toolkit = $prjc->getModel($pc->getPath())->toolkit;
        $vc = new ViewController();

        $view = $this->argument('view');
        $component = $this->argument('component');

        switch ($view) {
            case 'insert':
                $vc->generateViewInsert($framework, $toolkit, $component);
                break;            
            default:
                echo "ERROR: undefined view.";
                break;
        }        
    }
}
