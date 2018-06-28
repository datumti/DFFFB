/**
 * InsertController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');
var uc = require('locutus/php/strings/ucwords');

module.exports = {

    generateContentTs: function (project) {
        var content =
            "import { Component, OnInit } from '@angular/core'; \n \n" +
            "@Component({\n" +
            "selector: 'app-" + project.model + "-form',\n" +
            "templateUrl: './" + project.model + "Form.component.html',\n" +
            "styleUrls: ['./" + project.model + "Form.component.css']\n" +
            "})\n" +
            "export class " + uc(project.model) + "FormComponent implements OnInit {\n" +
            "constructor() { }\n" +
            "ngOnInit() {\n" +
            "}\n" +
            "}";
        var filePath = project.path + "/src/app/" + project.model + "/" + project.model + "Form/" + project.model + "Form.component.ts";
        fs.writeFile(filePath, content, function (err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateContentCss: function (project) {
        var content = ".example-container {" +
            "display: flex;" +
            "flex-direction: column;" +
          "}" +
          ".example-container > * {" +
            "width: 100%;" +
          "}";
        var filePath = project.path + "/src/app/" + project.model + "/" + project.model + "Form/" + project.model + "Form.component.css";
        fs.writeFile(filePath, content, function (err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlBootstrap: function (project) {
        var linha = 0; //controla as rows
        var arraysize = project.attrName.length;
        var content = "<form>";

        for (var i = 0; i < arraysize; i++) {

            if (linha % 2 == 0 || linha == 0) {
                content = content + '<div class="row">';
            }

            if (project.attrType[i] == 'text' || project.attrType[i] == 'email' || project.attrType[i] == 'number' || project.attrType[i] == 'password') {
                content = content + '<div class="col-md-6 col-12"><div class="form-group">' +
                    '<label for="formInput' + uc(project.attrName[i]) + '">' + uc(project.attrName[i]) + '</label>' +
                    '<input type="' + project.attrType[i] + '" class="form-control" id="formInput' + uc(project.attrName[i]) + '" name="' + project.attrName[i] + '">' +
                    '</div></div>';
            }

            if (project.attrType[i] == 'select') {
                content = content + '<div class="col-md-6 col-12"><div class="form-group">' +
                    '<label for="formInput' + uc(project.attrName[i]) + '">' + uc(project.attrName[i]) + '</label>' +
                    '<select class="form-control" id="formInput' + uc(project.attrName[i]) + '" name="' + project.attrName[i] + '">' +
                    '<option>Selecione...</option>' +
                    '</select>' +
                    '</div></div>';
            }
            if (project.attrType[i] == 'checkbox') {
                content = content + '<div class="col-md-6 col-12"><div class="form-group">' +
                    '<div class="form-check">' +
                    '<input class="form-check-input" type="checkbox" value="" id="formInput' + uc(project.attrName[i]) + '" name="' + project.attrName[i] + '">' +
                    '<label class="form-check-label" for="formInput' + uc(project.attrName[i]) + '">' + uc(project.attrName[i]) + '</label>' +
                    '</div></div></div>';
            }

            if (linha % 2 != 0) {
                content = content + '</div>';
            }

            linha++;
        }

        if (linha % 2 != 0) {
            content = content + '</div>';
        }
        content = content + "<br><input type='submit' value='REGISTRAR' class='btn btn-primary'>";
        content = content + "</form>";

        var filePath = project.path + "/src/app/" + project.model + "/" + project.model + "Form/" + project.model + "Form.component.html";
        fs.writeFile(filePath, content, function (err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlMaterialize: function (project) {
        var linha = 0; //controla as rows
        var arraysize = project.attrName.length;
        var content = "<form>";

        for (var i = 0; i < arraysize; i++) {

            if (linha % 2 == 0 || linha == 0) {
                content = content + '<div class="row">';
            }
            if (project.attrType[i] == 'text' || project.attrType[i] == 'email' || project.attrType[i] == 'number' || project.attrType[i] == 'password') {
                content = content + '<div class="col m6 s12"><div class="input-field">' +
                    '<input id="formInput' + uc(project.attrName[i]) + '" type="' + project.attrType[i] + '" class="validate" name="' + project.attrName[i] + '">' +
                    '<label for="formInput' + uc(project.attrName[i]) + '">' + uc(project.attrName[i]) + '</label>' +
                    '</div></div>';
            }
            if (project.attrType[i] == 'select') {
                content = content + '<div class="col m6 s12 input-field">' +
                    '<select name="' + project.attrName[i] + '">' +
                    '<option value="0" selected>Selecione...</option>' +
                    '</select>' +
                    '<label>' + uc(project.attrName[i]) + '</label>' +
                    '</div>';
            }
            if (project.attrType[i] == 'checkbox') {
                content = content + '<div class="col m6 s12">' +
                    '<label>' +
                    '<input type="checkbox" class="filled-in" name="' + project.attrName[i] + '"/>' +
                    '<span>' + uc(project.attrName[i]) + '</span>' +
                    '</label>' +
                    '</div>';
            }
            if (linha % 2 != 0) {
                content = content + '</div>';
            }

            linha++;
        }

        if (linha % 2 != 0) {
            content = content + '</div>';
        }
        content = content + "<br><a class='waves-effect waves-light btn'>REGISTRAR</a>";
        content = content + "</form>";

        var filePath = project.path + "/src/app/" + project.model + "/" + project.model + "Form/" + project.model + "Form.component.html";
        fs.writeFile(filePath, content, function (err) {
            var success = err ? false : true;
            return success;
        });
    },

    generateHtmlNgMaterial: function (project) {
        var linha = 0; //controla as rows
        var arraysize = project.attrName.length;
        var content = "<form>";
        var content = content + "<div class='example-container'>";

        for (var i = 0; i < arraysize; i++) {

            if (project.attrType[i] == 'text' || project.attrType[i] == 'email' || project.attrType[i] == 'number' || project.attrType[i] == 'password') {
                content = content + '<mat-form-field>' +
                    '<input matInput type="' + project.attrType[i] + '" name="' + project.attrName[i] + '" placeholder="' + uc(project.attrName[i]) + '">' +
                    '</mat-form-field>';
            }
            if (project.attrType[i] == 'select') {
                content = content + '<mat-select placeholder="' + uc(project.attrName[i]) + '" name="' + project.attrName[i] + '">' +
                    '<mat-option value="option">Selecione...</mat-option>' +
                    '</mat-select>';
            }
            if (project.attrType[i] == 'checkbox') {
                content = content + '<mat-checkbox name="' + project.attrName[i] + '">' + uc(project.attrName[i]) + '</mat-checkbox>';
            }
        }

        content = content + "<br><button type='button' mat-raised-button>REGISTRAR</button>";
        content = content + "</div>";
        content = content + "</form>";

        var filePath = project.path + "/src/app/" + project.model + "/" + project.model + "Form/" + project.model + "Form.component.html";
        fs.writeFile(filePath, content, function (err) {
            var success = err ? false : true;
            return success;
        });
    },

    createModelFolder: function (project) {
        var dir = project.path + '/src/app/' + project.model + '/' + project.model + 'Form';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

};

