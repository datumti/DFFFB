/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');
var angularInsertController = require('./AngularInsertController');
var angularSelectController = require('./AngularSelectController');

var ProjectController = {
  
    generate: function(req, res) {
        var framework = req.param('framework');
        var path = req.param('path');
        var toolkit = req.param('toolkit');
        var model = req.param('model');
        var attrName = req.param('attrName');
        var attrType = req.param('attrType');
        
        var project = { 
            framework: framework,
            path: path, 
            model: model, 
            toolkit: toolkit,
            attrName: attrName,
            attrType: attrType
        }

        switch (framework) {
            case "angular":
                ProjectController.generateAngularFiles(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes Angular gerados com sucesso.', error: '0' } });
                break;
            case "react":
                ProjectController.generateReactFiles(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes React gerados com sucesso.', error: '0' } });
                break;
            case "vue":
                ProjectController.generateVueFiles(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes Vue gerados com sucesso.', error: '0' } });
                break;
            default:
                break;
        }        
    },

    isPathValid : function(req, res) {
        var isValid = true;

        const framework = req.param('framework');
        const path = req.param('path');

        switch (framework) {
            case "angular":
                if (!fs.existsSync(path + '/src/app/')){
                    isValid = false;
                }
                break;
            case "react":
                if (!fs.existsSync(path)){
                    isValid = false;
                }
                break;
            case "vue":
                if (!fs.existsSync(path)){
                    isValid = false;
                }
                break;
            default:
                break;
        }
        return res.send(isValid);
    },

    generateAngularFiles : function(project) {
        //creating model directory
        var dir = project.path + '/src/app/' + project.model;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        switch (project.toolkit) {
            case "bootstrap":
                //generating insert screen
                angularInsertController.createModelFolder(project);
                angularInsertController.generateHtmlBootstrap(project);
                angularInsertController.generateContentTsBootstrap(project);
                angularInsertController.generateContentCss(project);
                //generating select screen
                angularSelectController.createModelFolder(project);
                angularSelectController.generateHtmlBootstrap(project);
                angularSelectController.generateContentTsBootstrap(project);
                angularSelectController.generateContentCss(project);
                break;
            case "materialize":
                //generating insert screen
                angularInsertController.createModelFolder(project);
                angularInsertController.generateHtmlMaterialize(project);
                angularInsertController.generateContentTsMaterialize(project);
                angularInsertController.generateContentCss(project);
                //generating select screen
                angularSelectController.createModelFolder(project);
                angularSelectController.generateHtmlMaterialize(project);
                angularSelectController.generateContentTsMaterialize(project);
                angularSelectController.generateContentCss(project);
                break;
            case "ngmaterial":
                //generating insert screen
                angularInsertController.createModelFolder(project);
                angularInsertController.generateHtmlNgMaterial(project);
                angularInsertController.generateContentTsNgMaterial(project);
                angularInsertController.generateContentCss(project);
                //generating select screen
                angularSelectController.createModelFolder(project);
                angularSelectController.generateHtmlNgMaterial(project);
                angularSelectController.generateContentTsNgMaterial(project);
                angularSelectController.generateContentCss(project);
                break;
            default:
                break;
        }
    },

    generateReactFiles : function(project) {

    },

    generateVueFiles : function(project) {

    }

};

module.exports = ProjectController;

