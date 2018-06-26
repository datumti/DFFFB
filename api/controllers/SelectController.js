/**
 * SelectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');
var uc = require('locutus/php/strings/ucwords');

module.exports = {
  
    generateContentTs: function(project) {
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

    generateContentCss: function(project) {
        var content = "";
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

        var filePath = project.path+"/src/app/"+project.model+"/"+project.model+"List/"+project.model+"Form.component.html";
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

