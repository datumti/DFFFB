<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PathController;
use App\Module;

class GenerateModule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:module {name} {args*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria um novo arquivo de model.';

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
        $name = $this->argument('name');
        $args = $this->argument('args');
        
        $attr = array();
        foreach($args as $a) {
            $attribute = explode(':', $a);
            array_push($attr, $attribute);
        }

        $isTypeValid = array();
        foreach($attr as $a) {
            switch ($a[1]) {
                case 'text':
                    array_push($isTypeValid, true);
                    break;
                case 'number':
                    array_push($isTypeValid, true);
                    break;
                case 'bool':
                    array_push($isTypeValid, true);
                    break;
                case 'list':
                    array_push($isTypeValid, true);
                    break;
                case 'password':
                    array_push($isTypeValid, true);
                    break;
                case 'email':
                    array_push($isTypeValid, true);
                    break;
                default:
                    array_push($isTypeValid, false);
                    break;
            }
        }

        if(!in_array(false, $isTypeValid)) {
            $pc = new PathController();
            $path = $pc->getPath();
            $module = new Module($name, $attr);

            if(!is_dir($path.'/dfffb_models')) {
                //creates models folder
                $pc->createEmptyFolder($path, 'dfffb_models');
                $this->createModuleFile($path, $module);
                echo "Arquivo ".$module->getName().".json gerado.";
            }
            else {
                $this->createModuleFile($path, $module);
                echo "Arquivo ".$module->getName().".json gerado.";
            }
        }
        else {
            echo "Tipo inválido detectado.\nPor favor utilize um dos seguintes tipos: text, number, bool, list, password";
        }
    }

    private function createModuleFile($path, $module){
        $file = fopen($path.'/dfffb_models/'.$module->getName().'.json', "w") or die("Unable to open file!");
        fwrite($file, json_encode((array) $module));
        fclose($file);
    }
}
