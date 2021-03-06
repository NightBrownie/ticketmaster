/**
 * angular-strap
 * @version v2.1.0 - 2014-09-05
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.modal').run(['$templateCache', function($templateCache) {

  $templateCache.put('customModal/customModal.tpl.html', '<div class="customModal" tabindex="-1" role="dialog"><div class="customModal-dialog"><div class="customModal-content"><div class="customModal-header.html" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="customModal-title" ng-bind="title"></h4></div><div class="customModal-body" ng-bind="content"></div><div class="customModal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>');

}]);