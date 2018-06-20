<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PathController;
use App\Module;

class ModuleController extends Controller
{
    public function retrieveModule($name) {
        $pc = new PathController();
        $path = $pc->getPath();
        $file = $path."/dfffb_models/".$name.".json";

        $exists = file_exists($file);
        if($exists) {
            $string = file_get_contents($file);
            $json_a = json_decode($string, true);
    
            if ($json_a != null) {
                $module = new Module($json_a['name'], $json_a['attributes']);
                return $module;
            }
            else {
                echo 'Could not recognize '.$name.'.json file. Bad format.';
                return null;
            }
        }
        else {
            return null;
        }        
    }
}
