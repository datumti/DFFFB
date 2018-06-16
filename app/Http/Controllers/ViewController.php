<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\PathController;
use App\Http\Controllers\ModuleController;
use App\Module;

class ViewController extends Controller
{
    public function generateViewInsert($framework, $toolkit, $component){
        $pc = new PathController();
        
        switch ($framework) {
            case 'angular':
                //cria pasta do componente
                $path = $pc->getPath()."/src/app";
                $pc->createEmptyFolder($path, $component);
                $componentPath = $path."/".$component;
                //cria os arquivos html, css, ts
                $fileHtml = fopen($componentPath."/".$component.".component.html", "w") or die("Unable to open file!");
                fwrite($fileHtml, $this->generateContentHtml($toolkit, $component));
                fclose($fileHtml);
                
                $fileCss = fopen($componentPath."/".$component.".component.css", "w") or die("Unable to open file!");
                fwrite($fileCss, $this->generateContentCss());
                fclose($fileCss);
                
                $fileTs = fopen($componentPath."/".$component.".component.ts", "w") or die("Unable to open file!");
                fwrite($fileTs, $this->generateContentTs($component));
                fclose($fileTs);
                break;            
            default:
                echo "ERROR: Undefined framework";
                break;
        }
        echo "Arquivos gerados com sucesso.";
    }

    public function generateViewUpdate(){
        
    }

    public function generateViewList(){
        
    }

    public function generateViewDashboard(){
        
    }

    private function generateContentTs($component){
        $content = "import { Component, OnInit } from '@angular/core';
                    
                    @Component({
                    selector: 'app-".$component."',
                    templateUrl: './".$component.".component.html',
                    styleUrls: ['./".$component.".component.css']
                    })
                    export class ".ucwords($component)."Component implements OnInit {
                    
                    constructor() { }
                    
                    ngOnInit() {
                    }
                    
                    }
                    ";
        return $content;
    }

    private function generateContentCss(){
        $content = "";
        return $content;
    }

    private function generateContentHtml($toolkit, $component){
        switch ($toolkit) {
            case 'bootstrap':
                return $this->generateHtmlBootstrap($component);
                break;
            case 'materialize':
                return $this->generateHtmlMaterialize($component);
                break;
            default:
                echo "ERROR: Undefined toolkit";
                break;
        }
    }

    private function generateHtmlBootstrap($component){
        $mc = new ModuleController();
        $module = $mc->retrieveModule($component);
        $attr = $module->getAttributes();
        $content = "<form>";
        foreach($attr as $attribute) {
            $content = $content.'<div class="form-group">
                                    <label for="formInput'.ucwords($attribute[0]).'">'.ucwords($attribute[0]).'</label>
                                    <input type="'.$attribute[1].'" class="form-control" id="formInput'.ucwords($attribute[0]).'">
                                </div>';
        }
        $content = $content."</form>";
        return $content;
    }

    private function generateHtmlMaterialize($component){
        $content = "";
        return $content;
    }
}
