var superroo = angular.module('superroo',[]);
angular.module('superroo')
    .filter('range', function() {
        return function(list, total) {
            total = parseInt(total, 10);

            for (var i = 0; i < total; i++) {
                list.push(i);
            }
            return list;
        };
    });

superroo.controller('superrooController', function($scope, $http,$window) {
    $scope.dd = [];
    $scope.doctors = [];
    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://127.0.0.1:3000/doctors',
        }).then(function (result){
            console.log(result.data);
            $scope.doctors = result.data;

        },function (error){
            console.log('Error: ' + error);
        });
    }

    $scope.hi = function(){
        $http({
            method: 'GET',
            url: 'http://127.0.0.1:3000/hi',
        }).then(function (result){
            console.log(result.data);
            $scope.dd = result.data;
        },function (error){
            console.log('Error: ' + error);
        });
    }
    $scope.makeAppointment = function(formData){
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:3000/makeAppointment',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: formData
        }).then(function (result){
            console.log(result);
            $scope.items = result.data;
            $window.alert("scheduled an appointment");
        },function (error){
            console.log('Error: ' + error);
        });
    }


});