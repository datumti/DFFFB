<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PathController;

class ViewController extends Controller
{
    public function generateViewInsert($toolkit, $component){
        $pc = new PathController();
        $path = $pc->getPath()."/src/app";
        $pc->createEmptyFolder($path, $component);
        
        /**
         * TODO:
         * navegar até a pasta src;
         * criar pasta do componente;
         * criar arquivos html, ts, css;
         * informar excedente ao usuário;
         */ 
    }

    public function generateViewUpdate(){
        
    }

    public function generateViewList(){
        
    }

    public function generateViewDashboard(){
        
    }
}
