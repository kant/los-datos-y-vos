angular.module('app').service('LocationIndicatorSvc', function($q, $http, $filter) {

    var getProvinceList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_provincia.json").success(function(data) {
            var list = []; 
            angular.forEach(data, function(element) {
                list.push({id: element.provincia_id, name: element.provincia_nombre});
            });
            defer.resolve($filter('orderBy')(list, 'name'));
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    var getDepartmentList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_departamento.json").success(function(data) {
            var list = []; 
            angular.forEach(data, function(element) {
                list.push({id: element.departamento_id, name: element.departamento_nombre != "" ? element.departamento_nombre : "Blank", provinceId: element.provincia_id});
            });
            defer.resolve($filter('orderBy')(list, 'name'));
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    var getNeighbourhoodList = function() {
        var defer = $q.defer();
        $http.get("data/barrios_caba.json").success(function(data) {
            var list = []; 
            angular.forEach(data, function(element) {
                list.push({id: element.comuna_id, name: element.barrio_nombre, departmentName: element.comuna_nombre});
            });
            defer.resolve($filter('orderBy')(list, 'name'));
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    return {
        getProvinceList: getProvinceList,
        getDepartmentList: getDepartmentList,
        getNeighbourhoodList: getNeighbourhoodList
    };

});