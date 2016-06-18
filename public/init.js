var SOVapp = angular.module("SOV", [])

SOV = {}

SOV.loadMenu = function(directive, $compile, $scope) {
    var template = "<div class='"+directive+"'></div>"
    var link = $compile(template)
    var content = link($scope)
    document.body.appendChild(content[0])
}
