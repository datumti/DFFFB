<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ViewSelectController extends Controller
{
    public function generateView($framework, $toolkit, $component){
        $pc = new PathController();
        
        switch ($framework) {
            case 'angular':
                //cria pasta do componente
                $path = $pc->getPath()."/src/app";
                $pc->createEmptyFolder($path, $component."Select");
                $componentPath = $path."/".$component."Select";
                //cria os arquivos html, css, ts
                $fileHtml = fopen($componentPath."/".$component."Select.component.html", "w") or die("Unable to open file!");
                fwrite($fileHtml, $this->generateContentHtml($toolkit, $component));
                fclose($fileHtml);
                
                $fileCss = fopen($componentPath."/".$component."Select.component.css", "w") or die("Unable to open file!");
                fwrite($fileCss, $this->generateContentCss());
                fclose($fileCss);
                
                $fileTs = fopen($componentPath."/".$component."Select.component.ts", "w") or die("Unable to open file!");
                fwrite($fileTs, $this->generateContentTs($component."Select"));
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
                return $this->generateSelectHtmlBootstrap($component);
                break;
            case 'materialize':
                return $this->generateSelectHtmlMaterialize($component);
                break;
            default:
                echo "ERROR: Undefined toolkit";
                break;
        }
    }

    private function generateSelectHtmlBootstrap($component){
        $mc = new ModuleController();
        $module = $mc->retrieveModule($component);

        if($module != null) {
            $attr = $module->getAttributes();
            $content = "<table class='table table-striped'>";
            $content = $content."<thead><tr>";
            foreach($attr as $attribute) {
                $content = $content."<th>".ucwords($attribute[0])."</th>";
            }
            $content = $content."<th></th><th></th>"; //botoes editar e excluir
            $content = $content."</tr></thead>";
            $content = $content."<tbody>";
            for($i=0; $i <= 4; $i++) {
                $content = $content."<tr>";
                foreach($attr as $attribute) {
                    $content = $content."<td>".$attribute[1]."</td>";
                }
                $content = $content."<td><button type='button' class='btn btn-success'>Editar</button></td>";
                $content = $content."<td><button type='button' class='btn btn-danger'>Excluir</button></td>";
                $content = $content."</tr>";
            }
            $content = $content."</tbody>";
            $content = $content."</table>";
            return $content;
        }
        else {
            echo "ERRO: o modelo ".$component." não existe ou está mal formatado. Utilize o comando 'generate:model'.";
            return null;
        }       
    }

    private function generateSelectHtmlMaterialize($component){
        $mc = new ModuleController();
        $module = $mc->retrieveModule($component);

        if($module != null) {
            $attr = $module->getAttributes();
            $content = "<table class='striped responsive-table'>";
            $content = $content."<thead><tr>";
            foreach($attr as $attribute) {
                $content = $content."<th>".ucwords($attribute[0])."</th>";
            }
            $content = $content."<th></th><th></th>"; //botoes editar e excluir
            $content = $content."</tr></thead>";
            $content = $content."<tbody>";
            for($i=0; $i <= 4; $i++) {
                $content = $content."<tr>";
                foreach($attr as $attribute) {
                    $content = $content."<td>".$attribute[1]."</td>";
                }
                $content = $content."<td><a class='waves-effect waves-light btn green'>Editar</a></td>";
                $content = $content."<td><a class='waves-effect waves-light btn red'>Excluir</a></td>";
                $content = $content."</tr>";
            }
            $content = $content."</tbody>";
            $content = $content."</table>";
            return $content;
        }
        else {
            echo "ERRO: o modelo ".$component." não existe ou está mal formatado. Utilize o comando 'generate:model'.";
            return null;
        }
    }
}
