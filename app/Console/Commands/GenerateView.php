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
    protected $signature = 'generate:view {view}';

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
        /*
        $view = $this->argument('view');
        $pc = new PathController();
        $path = $pc->getPath() . '/someview.blade.php';

        $txt = "hello world";

        $file = fopen($path, "w") or die("Unable to open file!");
        fwrite($file, $txt);
        fclose($file);

        echo 'Files generated.';
        */

        $pc = new PathController();
        $prjc = new ProjectController();
        $toolkit = $prjc->getModel($pc->getPath())->toolkit;
        $vc = new ViewController();
        $vc->generateViewInsert($toolkit, "funcionario");
    }
}
