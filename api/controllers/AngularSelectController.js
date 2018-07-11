/**
 * AngularSelectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');
var uc = require('locutus/php/strings/ucwords');

module.exports = {

    generateContentTsBootstrap: function(project) {
        var content =
        "import { Component, OnInit } from '@angular/core'; \n \n" +
        "@Component({\n" +
        "selector: 'app-" + project.model + "-list',\n" +
        "templateUrl: './" + project.model + "List.component.html',\n" +
        "styleUrls: ['./" + project.model + "List.component.css']\n" +
        "})\n" +
        "export class " + uc(project.model) + "ListComponent implements OnInit {\n" +
            "constructor() { }\n" +
            "ngOnInit() {\n" +
            "}\n" +
        "}";
        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.ts";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateContentTsMaterialize: function(project) {
        var content =
        "import { Component, OnInit } from '@angular/core'; \n \n" +
        "@Component({\n" +
        "selector: 'app-" + project.model + "-list',\n" +
        "templateUrl: './" + project.model + "List.component.html',\n" +
        "styleUrls: ['./" + project.model + "List.component.css']\n" +
        "})\n" +
        "export class " + uc(project.model) + "ListComponent implements OnInit {\n" +
            "constructor() { }\n" +
            "ngOnInit() {\n" +
            "}\n" +
        "}";
        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.ts";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateContentTsNgMaterial: function(project) {
        var arraysize = project.attrName.length;
        var tableSource = "const ELEMENT_DATA = [";
        tableSource += "{ ";
        for(var i=0; i < arraysize; i++) {            
            tableSource += project.attrName[i] + " : '" + project.attrType[i] + "',";            
        }
        tableSource += " },";
        tableSource += "];";

        var displayedColumns = "displayedColumns = [ ";
        for(var i=0; i < arraysize; i++) {
            displayedColumns += "'" + project.attrName[i] + "', ";            
        }
        displayedColumns += "'edit', 'delete'";
        displayedColumns += "];";

        var content =
        "import { Component, OnInit } from '@angular/core'; \n \n" +
        tableSource + "\n\n" +
        "@Component({\n" +
        "selector: 'app-" + project.model + "-list',\n" +
        "templateUrl: './" + project.model + "List.component.html',\n" +
        "styleUrls: ['./" + project.model + "List.component.css']\n" +
        "})\n" +
        "export class " + uc(project.model) + "ListComponent implements OnInit {\n" +
            displayedColumns + "\n" +    
            "dataSource = ELEMENT_DATA; \n" +
            "constructor() { }\n" +
            "ngOnInit() {\n" +
            "}\n" +
        "}\n";
        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.ts";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateContentCss: function(project) {
        var content = "table { width: 100%; }";
        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.css";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlBootstrap: function(project) {
        var arraysize = project.attrName.length;
        content = "<table class='table table-striped'>";
        content = content + "<thead><tr>";
        for(var i=0; i < arraysize; i++) {
            content = content + "<th>" + uc(project.attrName[i]) + "</th>";
        }
        content = content + "<th></th><th></th>"; //botoes editar e excluir
        content = content + "</tr></thead>";
        content = content + "<tbody>";
        for(var j=0; j <= 4; j++) {
            content = content + "<tr>";
            for(var i=0; i < arraysize; i++) {
                content = content + "<td>" + project.attrType[i] + "</td>";
            }
            content = content + "<td><button type='button' class='btn btn-success'>Editar</button></td>";
            content = content + "<td><button type='button' class='btn btn-danger'>Excluir</button></td>";
            content = content + "</tr>";
        }
        content = content + "</tbody>";
        content = content + "</table>";

        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.html";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlMaterialize: function(project) {
        var arraysize = project.attrName.length;
        content = "<table class='striped responsive-table'>";
        content = content + "<thead><tr>";
        for(var i=0; i < arraysize; i++) {
            content = content + "<th>" + uc(project.attrName[i]) + "</th>";
        }
        content = content + "<th></th><th></th>"; //botoes editar e excluir
        content = content + "</tr></thead>";
        content = content + "<tbody>";
        for(var j=0; j <= 4; j++) {
            content = content + "<tr>";
            for(var i=0; i < arraysize; i++) {
                content = content + "<td>" + project.attrType[i] + "</td>";
            }
            content = content + "<td><a class='waves-effect waves-light btn green'>Editar</a></td>";
            content = content + "<td><a class='waves-effect waves-light btn red'>Excluir</a></td>";
            content = content + "</tr>";
        }
        content = content + "</tbody>";
        content = content + "</table>";

        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.html";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlNgMaterial: function(project) {
        var arraysize = project.attrName.length;
        content = '<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">';
        for(var i=0; i < arraysize; i++) {
            content += '<ng-container matColumnDef="' + project.attrName[i] + '">' +
                            '<th mat-header-cell *matHeaderCellDef>' + uc(project.attrName[i]) + '</th>' +
                            '<td mat-cell *matCellDef="let element"> {{element.' + project.attrName[i] + '}} </td>' +
                        '</ng-container>';
        }
        content += '<ng-container matColumnDef="edit">' +
                        '<th mat-header-cell *matHeaderCellDef> Editar </th>' +
                        '<td mat-cell *matCellDef="let element">' +
                            '<button mat-raised-button color="primary">Editar</button>' +
                        '</td>' +
                    '</ng-container>';
        content += '<ng-container matColumnDef="delete">' +
                        '<th mat-header-cell *matHeaderCellDef> Deletar </th>' +
                        '<td mat-cell *matCellDef="let element">' +
                            '<button mat-raised-button color="warn">Deletar</button>' +
                        '</td>' +
                    '</ng-container>';
        content += '<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>' +
                    '<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>';
        content += '</table>';

        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"List.component.html";
        fs.writeFile(filePath, content, function(err) {
            var success = err ? false : true;
            return success;
        });
    },

    createModelFolder: function(project) {
        var dir = project.path + '/src/app/' + project.model + '/' + project.model + 'List';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

};

