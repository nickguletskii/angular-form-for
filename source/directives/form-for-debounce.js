/**
 * @ngdoc Directives
 * @name form-for-debounce
 *
 * @description
 * Angular introduced debouncing (via ngModelOptions) in version 1.3.
 * As of the time of this writing, that version is still in beta.
 * This component adds debouncing behavior for Angular 1.2.x.
 * It is primarily intended for use with &lt;input type=text&gt; and &lt;textarea&gt; elements.
 *
 * @param {int} formForDebounce Debounce duration in milliseconds.
 * By default this value is 1000ms.
 * To disable the debounce interval (aka to update on blur only) a value of false should be specified.
 *
 * @example
 * // To configure this component to debounce with a 2 second delay:
 * <input type="text"
 *        ng-model="username"
 *        form-for-debounce="2000" />
 *
 * // To disable the debounce interval and configure an input to update only on blur:
 * <input type="text"
 *        ng-model="username"
 *        form-for-debounce="false" />
 */
angular.module('formFor').directive('formForDebounce', function($log, $timeout, FormForConfiguration) {
  return {
    restrict: 'A',
    require: 'ngModel',
    priority: 99,
    link: function($scope, $element, attributes, ngModelController) {
      if (attributes.type === 'radio' || attributes.type === 'checkbox') {
        $log.warn('formForDebounce should only be used with <input type=text> and <textarea> elements');

        return;
      }

      var durationAttribute = attributes.formForDebounce;
      var duration = FormForConfiguration.defaultDebounceDuration;
      var debounce;

      // Debounce can be configured for blur-only by passing a value of 'false'.
      if (durationAttribute !== undefined) {
        if (durationAttribute.toString() === 'false') {
          duration = false;
        } else {
          durationAttribute = parseInt(durationAttribute);

          if (angular.isNumber(durationAttribute) && !isNaN(durationAttribute)) {
            duration = durationAttribute;
          }
        }
      }

      $element.unbind('input');

      if (duration !== false) {
        $element.bind('input', function() {
          $timeout.cancel(debounce);

          debounce = $timeout(function() {
            $scope.$apply(function() {
              ngModelController.$setViewValue($element.val());
            });
          }, duration);
        });
      }

      $element.bind('blur', function() {
        $scope.$apply(function() {
          ngModelController.$setViewValue($element.val());
        });
      });

      $scope.$on('$destroy', function() {
        if (debounce) {
          $timeout.cancel(debounce);
        }
      });
    }
  };
});
