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
        var path = req.param('path');
        var toolkit = req.param('toolkit');
        var model = req.param('model');
        var attrName = req.param('attrName');
        var attrType = req.param('attrType');
        
        var project = { 
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
                res.send("Arquivos gerados.");
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
                res.send("Arquivos gerados.");
                break;
            default:
                res.send("oops");
                break;
        }
        
    }

};

