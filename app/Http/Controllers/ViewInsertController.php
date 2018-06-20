<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ViewInsertController extends Controller
{
    public function generateView($framework, $toolkit, $component){
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
        echo "\nArquivos gerados.";
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
                return $this->generateInsertHtmlBootstrap($component);
                break;
            case 'materialize':
                return $this->generateInsertHtmlMaterialize($component);
                break;
            default:
                echo "ERROR: Undefined toolkit";
                break;
        }
    }

    private function generateInsertHtmlBootstrap($component){
        $mc = new ModuleController();
        $module = $mc->retrieveModule($component);

        if($module != null) {
            $attr = $module->getAttributes();
            $content = "<form>";

            $linha = 0; //controla as rows

            foreach($attr as $attribute) {

                if($linha % 2 == 0 || $linha == 0) {
                    $content = $content.'<div class="row">';
                }

                if($attribute[1] == 'text' || $attribute[1] == 'email' || $attribute[1] == 'number' || $attribute[1] == 'password') {
                    $content = $content.'<div class="col-md-6 col-12"><div class="form-group">
                    <label for="formInput'.ucwords($attribute[0]).'">'.ucwords($attribute[0]).'</label>
                    <input type="'.$attribute[1].'" class="form-control" id="formInput'.ucwords($attribute[0]).'" name="'.$attribute[0].'">
                    </div></div>';
                }
                if($attribute[1] == 'list') {
                    $content = $content.'<div class="col-md-6 col-12"><div class="form-group">
                    <label for="formInput'.ucwords($attribute[0]).'">'.ucwords($attribute[0]).'</label>
                    <select class="form-control" id="formInput'.ucwords($attribute[0]).'" name="'.$attribute[0].'">
                    <option>Selecione...</option>
                    </select>
                    </div></div>';
                }
                if($attribute[1] == 'bool') {
                    $content = $content.'<div class="col-md-6 col-12"><div class="form-group">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="formInput'.ucwords($attribute[0]).'" name="'.$attribute[0].'">
                    <label class="form-check-label" for="formInput'.ucwords($attribute[0]).'">
                    '.ucwords($attribute[0]).'
                    </label>
                    </div>
                    </div></div>';
                }
                
                if($linha % 2 != 0) {
                    $content = $content.'</div>';
                }
                
                $linha++;
            }

            if($linha % 2 != 0) {
                $content = $content.'</div>';
            }

            $content = $content."<br><input type='submit' value='REGISTRAR' class='btn btn-primary'>";
            $content = $content."</form>";
            return $content;
        }
        else {
            echo "ERRO: o modelo ".$component." não existe ou está mal formatado. Utilize o comando 'generate:model'.";
            return null;
        }        
    }

    private function generateInsertHtmlMaterialize($component){
        $mc = new ModuleController();
        $module = $mc->retrieveModule($component);

        if($module != null) {
            $attr = $module->getAttributes();
            $content = "<form>";

            $linha = 0; //controla as rows

            foreach($attr as $attribute) {

                if($linha % 2 == 0 || $linha == 0) {
                    $content = $content.'<div class="row">';
                }

                if($attribute[1] == 'text' || $attribute[1] == 'email' || $attribute[1] == 'number' || $attribute[1] == 'password') {
                    $content = $content.'<div class="col m6 s12"><div class="input-field">
                    <input id="formInput'.ucwords($attribute[0]).'" type="'.$attribute[1].'" class="validate" name="'.$attribute[0].'">
                    <label for="formInput'.ucwords($attribute[0]).'">'.ucwords($attribute[0]).'</label>                    
                    </div></div>';
                }
                if($attribute[1] == 'list') {
                    $content = $content.'<div class="col m6 s12 input-field">
                    <select name="'.$attribute[0].'">
                    <option value="0" selected>Selecione...</option>
                    </select>
                    <label>'.ucwords($attribute[0]).'</label>
                    </div>';
                }
                if($attribute[1] == 'bool') {
                    $content = $content.'<div class="col m6 s12">
                    <label>
                    <input type="checkbox" class="filled-in" name="'.$attribute[0].'"/>
                    <span>'.ucwords($attribute[0]).'</span>
                    </label>
                    </div>';
                }                

                if($linha % 2 != 0) {
                    $content = $content.'</div>';
                }
                
                $linha++;
            }
            
            if($linha % 2 != 0) {
                $content = $content.'</div>';
            }

            $content = $content."<br><a class='waves-effect waves-light btn'>REGISTRAR</a>";
            $content = $content."</form>";
            return $content;
        }
        else {
            echo "ERRO: o modelo ".$component." não existe ou está mal formatado. Utilize o comando 'generate:model'.";
            return null;
        }
    }
}
