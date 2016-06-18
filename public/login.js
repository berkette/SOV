// Templates for:
//  - Splash page
//  - Registration
//  - Login

SOVapp.directive("splash", function($compile) {
    return {
        restrict: "C",
        templateUrl: "templates/splash.html",
        link: function($scope, $element, $attrs) {
            var register = $element[0].getElementsByClassName("but-register")[0]
            var login = $element[0].getElementsByClassName("but-login")[0]

            register.onclick = function () {
                $element[0].parentNode.removeChild($element[0])
                SOV.loadMenu("register", $compile, $scope)
            }

            login.onclick = function () {
                $element[0].parentNode.removeChild($element[0])
                SOV.loadMenu("login", $compile, $scope)
            }
        }
    }
})

SOVapp.directive("register", function($compile) {
    return {
        restrict: "C",
        templateUrl: "templates/register.html",
        link: function($scope, $element, $attrs) {
            // do something 
        }
    }
})

SOVapp.directive("login", function($compile) {
    return {
        restrict: "C",
        templateUrl: "templates/login.html",
        link: function($scope, $element, $attrs) {
            // do something 
        }
    }
})
