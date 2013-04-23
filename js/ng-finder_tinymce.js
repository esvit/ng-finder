/**
 * TinyMCE integration
 */
angular.module('ngFinderTinyMCE', ['ui'])
    .run(['$rootScope', '$compile', 'ui.config', '$filter', function($rootScope, $compile, uiConfig, $filter) {
        if (uiConfig.tinymce) {
            var scope = $rootScope.$new();
            uiConfig.tinymce.file_browser_callback = function(field_name, url, type, win) {
                scope.fieldName = field_name;
                scope.window = win;
                scope.close = function() {
                    $('#elfinder').hide();
                }

                if($('#elfinder').length == 0) {
                    var html = '<div id="elfinder" class="modal fade in" style="z-index: 400001; display: block"> \
                                    <div class="modal-dialog"> \
                                        <div class="modal-content"> \
                                            <div class="modal-header"> \
                                                <button type="button" class="close" ng-click="close()" data-dismiss="modal" aria-hidden="true">×</button> \
                                                ' + 'Select file' + ' \
                                            </div> \
                                            <div class="modal-body el-finder" select="selectFile()" ></div> \
                                        </div> \
                                    </div> \
                                </div>';
                    
                    $('body').append(html);
                    $compile($('#elfinder'))(scope);
                } else {
                    $('#elfinder').show();
                }
            }
        }
    }])