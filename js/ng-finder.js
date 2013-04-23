/**
 * <div class="el-finder" toolbar="mkdir,mkfile,upload|open,download|info|copy,cut"></div>
 */
angular.module('ngFinder', [])
    .directive('elFinder', function() {
        return {
            restrict: 'C',
            scope: {
                'file'      : '=',
                'onSelect'  : '&select'
            },
            controller: function($scope) {
                // for TinyMCE integration
                $scope.selectFile = function(url) {
                    var aFieldName = $scope.$parent.fieldName, 
                        aWin = $scope.$parent.window;

                    aWin.document.forms[0].elements[aFieldName].value = url;
                    $('#elfinder').hide();
                }
            },
            link: function(scope, element, attrs) {
                var menus = {
                    toolbar: attrs.toolbar || 'mkdir,mkfile,upload|open,download|info|copy,cut,paste|rename,rm|view|help',
                    navbar:  attrs.contextmenuNavbar || 'open,|,copy,cut,paste,|,rm,|,info',
                    cwd:     attrs.contextmenuCwd || 'reload,back,|,upload,mkdir,mkfile,paste,|,info',
                    files:   attrs.contextmenuFiles || 'open,download,|,copy,cut,paste,|,rm,edit,rename,|,info'
                }

                var options = {
                    // lang: 'ru',             // language (OPTIONAL)
                    rememberLastDir : true,
                    uiOptions: {
                        toolbar : menus.toolbar.split('|').map(function(item) { return item.split(',');})
                    },
                    contextmenu : {
                        navbar : menus.navbar.split(','),
                        cwd    : menus.cwd.split(','),
                        files  : menus.files.split(',')
                    },
                    url : attrs.url || '/elfinder'
                };
                if (attrs.select) {
                    options.contextmenu.files.unshift('getfile');
                    options.getFileCallback = function(url) {
                        scope.selectFile(url);
                    }
                }
                $(element).elfinder(options);
                $('.elfinder-toolbar', element).addClass('btn-toolbar');
                $('.elfinder-buttonset', element).addClass('btn-group');
                $('.elfinder-button', element).addClass('btn');
                // glyphicons
                var replaceClasses = {
                    'back': 'arrow-left',
                    'forward': 'arrow-right',
                    'mkdir': 'plus-sign',
                    'mkfile': 'file',
                    'upload': 'upload',
                    'open': 'folder-open',
                    'download': 'download-alt',
                    'getfile': 'download',
                    'info': 'info-sign',
                    'quicklook': 'eye-open',
                    'rm': 'trash',
                    'rename': 'pencil',
                    'edit': 'pencil',
                    'resize': 'fullscreen',
                    'view': 'th',
                    'sort': 'sort',
                    'help': 'question-sign'
                };
                // font awesome
                $('.elfinder-button-icon-copy', element).removeClass('elfinder-button-icon').addClass('icon-cut');
                $('.elfinder-button-icon-cut', element).removeClass('elfinder-button-icon').addClass('icon-copy');
                $('.elfinder-button-icon-paste', element).removeClass('elfinder-button-icon').addClass('icon-paste');

                angular.forEach(replaceClasses, function(newClass, oldClass) {
                    $('.elfinder-button-icon-' + oldClass, element)
                        .removeClass('elfinder-button-icon')
                        .addClass('glyphicon glyphicon-' + newClass);
                });
            }
        };
    });