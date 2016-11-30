angular.module('app').controller('QuizCtrl', function($scope, $state, $stateParams, EventBusSvc, StudentDataSvc, QuizSvc) {
    
    $scope.studentData = StudentDataSvc.getStudentData();
    $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
    $scope.pageData = $scope.sectionData.pages[$stateParams.pageNumber];
    $scope.sliderOptions = {
        floor: 0,
        ceil: 100,
        hideLimitLabels: true
    };
    
    $scope.keys = [];
    $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
    $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "La " : "La Provincia de ") + $scope.studentData.province.name;
    
    $scope.goToNextPage = function(pageNumber) {
        var questionStateName = "root.quizSection{{stepNumber}}.question".replace("{{stepNumber}}", $state.current.data.stepNumber);
        var resultStateName = "root.quizSection{{stepNumber}}.result".replace("{{stepNumber}}", $state.current.data.stepNumber);
        StudentDataSvc.updateStudentData($scope.studentData);
        if(!!pageNumber) {
            $state.go(questionStateName, { pageNumber: pageNumber});
        } else {
            $state.go(resultStateName);
        }
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.initSliderValue = function(questionId, optionId) {
        if(!$scope.studentData[$scope.sectionData.id]) {
            $scope.studentData[$scope.sectionData.id] = {};
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId]) {
            $scope.studentData[$scope.sectionData.id][questionId] = {};
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId][optionId]) {
            $scope.studentData[$scope.sectionData.id][questionId][optionId] = 0;
        }
    };

});
