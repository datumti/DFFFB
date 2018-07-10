/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('fs');
var insertController = require('./InsertController');
var selectController = require('./SelectController');

module.exports = {
  
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

        //creating model directory
        var dir = project.path + '/src/app/' + project.model;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        switch (toolkit) {
            case "bootstrap":
                //generating insert screen
                insertController.createModelFolder(project);
                insertController.generateHtmlBootstrap(project);
                insertController.generateContentTs(project);
                insertController.generateContentCss(project);
                //generating select screen
                selectController.createModelFolder(project);
                selectController.generateHtmlBootstrap(project);
                selectController.generateContentTs(project);
                selectController.generateContentCss(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes gerados com sucesso.', error: '0' } });
                break;
            case "materialize":
                //generating insert screen
                insertController.createModelFolder(project);
                insertController.generateHtmlMaterialize(project);
                insertController.generateContentTs(project);
                insertController.generateContentCss(project);
                //generating select screen
                selectController.createModelFolder(project);
                selectController.generateHtmlMaterialize(project);
                selectController.generateContentTs(project);
                selectController.generateContentCss(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes gerados com sucesso.', error: '0' } });
                break;
            case "ngmaterial":
                //generating insert screen
                insertController.createModelFolder(project);
                insertController.generateHtmlNgMaterial(project);
                insertController.generateContentTs(project);
                insertController.generateContentCss(project);
                //generating select screen
                selectController.createModelFolder(project);
                selectController.generateHtmlNgMaterial(project);
                selectController.generateContentTs(project);
                selectController.generateContentCss(project);
                return res.view('pages/homepage', { feedback: { msg: 'Componentes gerados com sucesso.', error: '0' } });
                break;
            default:
                return res.view('pages/homepage', { feedback: { msg: 'Ocorreu um erro ao gerar os arquivos.', error: '1' } });
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
    }

};

