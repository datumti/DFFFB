var addBtn = new Vue({
    el: '#add-btn',
    methods: {
        addLine: function () {
            attrList.attributes++;
        },
    }
});

var attrList = new Vue({
    el: '#attr-list',
    data: {
        attributes: 1
    }
});

var pathValidation = new Vue({
    el: '#path-validation',
    data: {
        info  : '',
        alerttype : ''
    }
});

var toolkitValidation = new Vue({
    el: '#toolkit-validation',
    data: {
        toolkitwarning  : ''
    },
    methods: {
        onChange: function() {
            const toolkit = this.$refs.toolkit.value;
            if(toolkit == 'ngmaterial') {
                this.toolkitwarning = 'ATENÇÃO! Os componentes MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule, MatCheckboxModule e MatButtonModule devem ser importados.';
            }
            else {
                this.toolkitwarning = '';
            }
        }
    }
});

var projectPath = new Vue({
    el: '#project-path',
    methods: {
        onBlur: function() {
            const path = this.$refs.path.value;
            const framework = 'angular';
            if(path != "") {
                axios
                .post('/api/project/validate', {
                    framework: framework,
                    path: path
                })
                .then(function (response) {
                    if(response.data) {
                        pathValidation.alerttype = 'alert-success';
                        pathValidation.info = 'Projeto válido.';
                    }
                    else {
                        pathValidation.alerttype = 'alert-danger';
                        pathValidation.info = 'Projeto inválido. A estrutura de diretórios para este framework está correta?';
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
    }
});