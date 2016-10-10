(function () {

    angular.module('procuraAlerta.directives')
        .directive('dateValidator', ["moment", function (moment) {

            var validarData = function (data, formato) {
                if(data === undefined) {
                    return true;
                }

                var resultado = moment(data, formato.toUpperCase(), true);
                return resultado.isValid();
            };



            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    dateFormat: '@'
                },
                link: function (scope, elem, attrs, ngModelCtrl) {

                    //For DOM -> model validation
                    ngModelCtrl.$parsers.unshift(function (value) {
                        var valid = validarData(value, scope.dateFormat);
                        ngModelCtrl.$setValidity('validDate', valid);
                        return valid ? value : undefined;
                    });

                    //For Model Update --> DOM
                    ngModelCtrl.$formatters.unshift(function (value) {
                        var valid = validarData(value, scope.dateFormat);
                        ngModelCtrl.$setValidity('validDate', valid);
                        return value;
                    });
                }
            };
        }]);

})();