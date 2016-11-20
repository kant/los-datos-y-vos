angular.module("app",["ngAnimate","ui.router"]),angular.module("app").config(["$locationProvider","$stateProvider","$urlRouterProvider",function(t,e,a){t.html5Mode({enabled:!0}),e.state("root",{url:"",abstract:!0,views:{header:{templateUrl:"html/default/header.html",controller:"HeaderCtrl"}}}),e.state("root.welcome",{url:"/bienvenido",views:{"container@":{templateUrl:"html/welcome/index.html",controller:"welcomeCtrl"}}}),e.state("root.signUpForm",{url:"/registro",views:{"container@":{templateUrl:"html/sign-up/index.html",controller:"signUpFormCtrl"}}}),e.state("root.signUpForm.classCode",{url:"/codigo-clase",templateUrl:"html/sign-up/class-code.html"}),e.state("root.signUpForm.studentData",{url:"/informacion",templateUrl:"html/sign-up/student-data.html"}),e.state("root.quizSection1",{url:"/primer-paso",data:{stepNumber:1},views:{"container@":{templateUrl:"html/quiz-section-1/index.html"}}}),e.state("root.quizSection1.result",{url:"/resultados",templateUrl:"html/quiz-section-1/result.html"}),e.state("root.quizSection1.question",{url:"/{pageNumber}",templateUrl:"html/quiz-section-1/question.html",controller:"QuizSection1Ctrl"}),a.otherwise("/bienvenido")}]),angular.module("app").factory("QuizFactory",function(){var t={1:{title:"Primer Paso",pages:{1:{previousPage:!1,nextPage:2,questions:[{id:1,type:"slider",text:"1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje crees que son chicos de entre 15 y 18 años?",options:[{id:"a",text:"¿Tu comuna?"},{id:"b",text:"¿La Ciudad de Buenos Aires?"}]}]},2:{previousPage:1,nextPage:!1,questions:[{id:2,type:"slider",text:"Contanos qué porcentaje de chicos de entre 15 y 18 años crees que van a la escuela en:",options:[{id:"a",text:"¿Tu comuna?"},{id:"b",text:"¿La Ciudad de Buenos Aires?"}]}]}}}};return t}),angular.module("app").factory("EventBusSvc",["$rootScope",function(t){var e=function(e,a){return t.$on(e,a)},a=function(e,a){t.$emit(e,a)};return{subscribe:e,broadcast:a}}]),angular.module("app").service("LocationIndicatorSvc",["$q","$http","$filter",function(t,e,a){var n=function(){var a=t.defer();return e.get("data/indicadores_provincia.json").success(function(t){a.resolve(t)}).catch(function(t){a.reject(t)}),a.promise},o=function(){var n=t.defer();return e.get("data/indicadores_departamento.json").success(function(t){var e=[];angular.forEach(t,function(t){e.push({id:t.departamento_id,name:t.departamento_nombre,provinceId:t.provincia_id})}),n.resolve(a("orderBy")(e,"name"))}).catch(function(t){n.reject(t)}),n.promise},r=function(){var n=t.defer();return e.get("data/barrios_caba.json").success(function(t){var e=[];angular.forEach(t,function(t){e.push({id:t.comuna_id,name:t.barrio_nombre,departmentName:t.comuna_nombre})}),n.resolve(a("orderBy")(e,"name"))}).catch(function(t){n.reject(t)}),n.promise};return{getProvinceList:n,getDepartmentList:o,getNeighbourhoodList:r}}]),angular.module("app").service("QuizSvc",["$q","$http","QuizFactory",function(t,e,a){var n=function(t){return a[t]};return{getSectionData:n}}]),angular.module("app").factory("StudentDataSvc",function(){var t={},e=localStorage.getItem("studentData");e&&(t=JSON.parse(e));var a=function(){localStorage.setItem("studentData",JSON.stringify({}))},n=function(){return t},o=function(t){localStorage.setItem("studentData",JSON.stringify(t))};return{clearStudentData:a,getStudentData:n,updateStudentData:o}}),angular.module("app").controller("HeaderCtrl",["$scope","$state","EventBusSvc","StudentDataSvc",function(t,e,a,n){t.step={},t.studentData=n.getStudentData(),t.$on("$stateChangeSuccess",function(){switch(e.current.name){case"root.welcome":n.clearStudentData();break;case"root.signUpForm.studentData":a.broadcast("updateStep",{name:"Primer paso 1",number:1})}}),a.subscribe("updateClassCode",function(e,a){t.studentData.classCode=a}),a.subscribe("updateStep",function(e,a){t.stepName=a.name,t.stepNumber=a.number})}]),angular.module("app").controller("QuizSection1Ctrl",["$scope","$state","$stateParams","EventBusSvc","StudentDataSvc","QuizSvc",function(t,e,a,n,o,r){t.studentData=o.getStudentData(),t.sectionData=r.getSectionData(e.current.data.stepNumber),t.pageData=t.sectionData.pages[a.pageNumber],t.goToNextPage=function(t){t?e.go("root.quizSection1.question",{pageNumber:t}):e.go("root.quizSection1.result")}}]),angular.module("app").controller("signUpFormCtrl",["$scope","$state","$filter","EventBusSvc","StudentDataSvc","LocationIndicatorSvc",function(t,e,a,n,o,r){var u=function(){t.studentData=o.getStudentData(),r.getProvinceList().then(function(e){t.provinceList=e}),t.departmentList=[]},i=function(){2==t.studentData.provinceId?r.getNeighbourhoodList().then(function(e){t.departmentList=e}):r.getDepartmentList().then(function(e){t.departmentList=a("filter")(e,{provinceId:t.studentData.provinceId},!0)})};t.$watch("studentData.provinceId",function(){i()}),t.saveClassCode=function(){e.go("root.signUpForm.studentData"),o.updateStudentData(t.studentData),n.broadcast("updateClassCode",t.studentData.classCode)},t.saveStudentData=function(){o.updateStudentData(t.studentData),e.go("root.quizSection1.question",{pageNumber:1})},u()}]),angular.module("app").controller("welcomeCtrl",["$scope",function(t){}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInJvdXRlcy5qcyIsImZhY3RvcnkvcXVpei5mYWN0b3J5LmpzIiwic2VydmljZS9ldmVudEJ1cy5zdmMuanMiLCJzZXJ2aWNlL2xvY2F0aW9uSW5kaWNhdG9yLnN2Yy5qcyIsInNlcnZpY2UvcXVpei5zdmMuanMiLCJzZXJ2aWNlL3N0dWRlbnREYXRhLnN2Yy5qcyIsImNvbnRyb2xsZXIvZGVmYXVsdC9oZWFkZXIuY3RybC5qcyIsImNvbnRyb2xsZXIvcXVpei9xdWl6U2VjdGlvbjEuY3RybC5qcyIsImNvbnRyb2xsZXIvc2lnbi11cC9zaWduVXBGb3JtLmN0cmwuanMiLCJjb250cm9sbGVyL3dlbGNvbWUvd2VsY29tZS5jdHJsLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkbG9jYXRpb25Qcm92aWRlciIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiaHRtbDVNb2RlIiwiZW5hYmxlZCIsInN0YXRlIiwidXJsIiwiYWJzdHJhY3QiLCJ2aWV3cyIsImhlYWRlciIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImNvbnRhaW5lckAiLCJkYXRhIiwic3RlcE51bWJlciIsIm90aGVyd2lzZSIsImZhY3RvcnkiLCJxdWl6IiwiMSIsInRpdGxlIiwicGFnZXMiLCJwcmV2aW91c1BhZ2UiLCJuZXh0UGFnZSIsInF1ZXN0aW9ucyIsImlkIiwidHlwZSIsInRleHQiLCJvcHRpb25zIiwiMiIsIiRyb290U2NvcGUiLCJzdWJzY3JpYmUiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsIiRvbiIsImJyb2FkY2FzdCIsIiRlbWl0Iiwic2VydmljZSIsIiRxIiwiJGh0dHAiLCIkZmlsdGVyIiwiZ2V0UHJvdmluY2VMaXN0IiwiZGVmZXIiLCJnZXQiLCJzdWNjZXNzIiwicmVzb2x2ZSIsImNhdGNoIiwicmVqZWN0IiwicHJvbWlzZSIsImdldERlcGFydG1lbnRMaXN0IiwibGlzdCIsImZvckVhY2giLCJlbGVtZW50IiwicHVzaCIsImRlcGFydGFtZW50b19pZCIsIm5hbWUiLCJkZXBhcnRhbWVudG9fbm9tYnJlIiwicHJvdmluY2VJZCIsInByb3ZpbmNpYV9pZCIsImdldE5laWdoYm91cmhvb2RMaXN0IiwiY29tdW5hX2lkIiwiYmFycmlvX25vbWJyZSIsImRlcGFydG1lbnROYW1lIiwiY29tdW5hX25vbWJyZSIsIlF1aXpGYWN0b3J5IiwiZ2V0U2VjdGlvbkRhdGEiLCJzZWN0aW9uTnVtYmVyIiwic3R1ZGVudERhdGEiLCJzYXZlZERhdGEiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInBhcnNlIiwiY2xlYXJTdHVkZW50RGF0YSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJnZXRTdHVkZW50RGF0YSIsInVwZGF0ZVN0dWRlbnREYXRhIiwibmV3U3R1ZGVudERhdGEiLCIkc2NvcGUiLCIkc3RhdGUiLCJFdmVudEJ1c1N2YyIsIlN0dWRlbnREYXRhU3ZjIiwic3RlcCIsImN1cnJlbnQiLCJudW1iZXIiLCJldmVudCIsImNsYXNzQ29kZSIsInN0ZXBOYW1lIiwiJHN0YXRlUGFyYW1zIiwiUXVpelN2YyIsInNlY3Rpb25EYXRhIiwicGFnZURhdGEiLCJwYWdlTnVtYmVyIiwiZ29Ub05leHRQYWdlIiwiZ28iLCJMb2NhdGlvbkluZGljYXRvclN2YyIsImFjdGl2YXRlIiwidGhlbiIsInByb3ZpbmNlTGlzdCIsImRlcGFydG1lbnRMaXN0IiwidXBkYXRlRGVwYXJ0bWVudExpc3QiLCIkd2F0Y2giLCJzYXZlQ2xhc3NDb2RlIiwic2F2ZVN0dWRlbnREYXRhIl0sIm1hcHBpbmdzIjoiQUFFQUEsUUFBQUMsT0FBQSxPQUFBLFlBQUEsY0NBQUQsUUFBQUMsT0FBQSxPQUFBQyxRQUFBLG9CQUFBLGlCQUFBLHFCQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEdBRUFGLEVBQUFHLFdBQ0FDLFNBQUEsSUFHQUgsRUFBQUksTUFBQSxRQUNBQyxJQUFBLEdBQ0FDLFVBQUEsRUFDQUMsT0FDQUMsUUFDQUMsWUFB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QUFDLFlBQ0FnRSxFQUFBYSxTQUFBYixFQUFBWSxZQUFBdEUsTUFBQW9FLEVBQUFJLFlBRUFkLEVBQUFlLGFBQUEsU0FBQUQsR0FDQUEsRUFDQWIsRUFBQWUsR0FBQSw4QkFBQUYsV0FBQUEsSUFFQWIsRUFBQWUsR0FBQSxnQ0NWQWpHLFFBQUFDLE9BQUEsT0FBQWEsV0FBQSxrQkFBQSxTQUFBLFNBQUEsVUFBQSxjQUFBLGlCQUFBLHVCQUFBLFNBQUFtRSxFQUFBQyxFQUFBeEMsRUFBQXlDLEVBQUFDLEVBQUFjLEdBRUEsR0FBQUMsR0FBQSxXQUNBbEIsRUFBQVosWUFBQWUsRUFBQU4saUJBQ0FvQixFQUFBdkQsa0JBQUF5RCxLQUFBLFNBQUFwRixHQUNBaUUsRUFBQW9CLGFBQUFyRixJQUVBaUUsRUFBQXFCLG1CQUdBQyxFQUFBLFdBQ0EsR0FBQXRCLEVBQUFaLFlBQUFWLFdBQ0F1QyxFQUFBckMsdUJBQUF1QyxLQUFBLFNBQUFwRixHQUNBaUUsRUFBQXFCLGVBQUF0RixJQUdBa0YsRUFBQS9DLG9CQUFBaUQsS0FBQSxTQUFBcEYsR0FDQWlFLEVBQUFxQixlQUFBNUQsRUFBQSxVQUFBMUIsR0FBQTJDLFdBQUFzQixFQUFBWixZQUFBVixhQUFBLEtBS0FzQixHQUFBdUIsT0FBQSx5QkFBQSxXQUNBRCxNQUdBdEIsRUFBQXdCLGNBQUEsV0FDQXZCLEVBQUFlLEdBQUEsK0JBQ0FiLEVBQUFMLGtCQUFBRSxFQUFBWixhQUNBYyxFQUFBOUMsVUFBQSxrQkFBQTRDLEVBQUFaLFlBQUFvQixZQUdBUixFQUFBeUIsZ0JBQUEsV0FDQXRCLEVBQUFMLGtCQUFBRSxFQUFBWixhQUNBYSxFQUFBZSxHQUFBLDhCQUFBRixXQUFBLEtBR0FJLE9DckNBbkcsUUFBQUMsT0FBQSxPQUFBYSxXQUFBLGVBQUEsU0FBQSxTQUFBbUUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQXBwIENvbmZpZ1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nQW5pbWF0ZScsICd1aS5yb3V0ZXInXSk7XG5cblxuIiwiLy8gUm91dGVzIENvbmZpZ1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICBcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xuICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncm9vdCcse1xuICAgICAgICB1cmw6ICcnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdoZWFkZXInOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL2RlZmF1bHQvaGVhZGVyLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIZWFkZXJDdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncm9vdC53ZWxjb21lJywge1xuICAgICAgICB1cmw6ICcvYmllbnZlbmlkbycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGFpbmVyQCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvd2VsY29tZS9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnd2VsY29tZUN0cmwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyb290LnNpZ25VcEZvcm0nLCB7XG4gICAgICAgIHVybDogJy9yZWdpc3RybycsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGFpbmVyQCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2h0bWwvc2lnbi11cC9pbmRleC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2lnblVwRm9ybUN0cmwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyb290LnNpZ25VcEZvcm0uY2xhc3NDb2RlJywge1xuICAgICAgICB1cmw6ICcvY29kaWdvLWNsYXNlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL3NpZ24tdXAvY2xhc3MtY29kZS5odG1sJ1xuICAgIH0pO1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3Jvb3Quc2lnblVwRm9ybS5zdHVkZW50RGF0YScsIHtcbiAgICAgICAgdXJsOiAnL2luZm9ybWFjaW9uJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL3NpZ24tdXAvc3R1ZGVudC1kYXRhLmh0bWwnXG4gICAgfSk7XG4gICAgICAgIFxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyb290LnF1aXpTZWN0aW9uMScsIHtcbiAgICAgICAgdXJsOiAnL3ByaW1lci1wYXNvJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc3RlcE51bWJlcjogMVxuICAgICAgICB9LFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2NvbnRhaW5lckAnOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdodG1sL3F1aXotc2VjdGlvbi0xL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncm9vdC5xdWl6U2VjdGlvbjEucmVzdWx0Jywge1xuICAgICAgICB1cmw6ICcvcmVzdWx0YWRvcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9xdWl6LXNlY3Rpb24tMS9yZXN1bHQuaHRtbCdcbiAgICB9KTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdyb290LnF1aXpTZWN0aW9uMS5xdWVzdGlvbicsIHtcbiAgICAgICAgdXJsOiAnL3twYWdlTnVtYmVyfScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaHRtbC9xdWl6LXNlY3Rpb24tMS9xdWVzdGlvbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1F1aXpTZWN0aW9uMUN0cmwnXG4gICAgfSk7XG4gICAgICAgICAgXG4gICAgLy8gY2F0Y2ggYWxsIHJvdXRlXG4gICAgLy8gc2VuZCB1c2VycyB0byB0aGUgZm9ybSBwYWdlIFxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9iaWVudmVuaWRvJyk7XG5cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1F1aXpGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcXVpeiA9IHtcbiAgICAgICAgMToge1xuICAgICAgICAgICAgdGl0bGU6IFwiUHJpbWVyIFBhc29cIixcbiAgICAgICAgICAgIHBhZ2VzOiB7XG4gICAgICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0UGFnZTogMixcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzbGlkZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIjEuIEVuIGVzdG9zIGx1Z2FyZXMgcXVlIHRlIGRldGFsbGFtb3MsIHkgdGVuaWVuZG8gZW4gY3VlbnRhIHRvZGFzIGxhcyBwZXJzb25hcyBxdWUgdml2ZW4gYWjDrSwgwr9xdcOpIHBvcmNlbnRhamUgY3JlZXMgcXVlIHNvbiBjaGljb3MgZGUgZW50cmUgMTUgeSAxOCBhw7Fvcz9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiwr9UdSBjb211bmE/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLCv0xhIENpdWRhZCBkZSBCdWVub3MgQWlyZXM/XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAyOiB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzUGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNsaWRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiQ29udGFub3MgcXXDqSBwb3JjZW50YWplIGRlIGNoaWNvcyBkZSBlbnRyZSAxNSB5IDE4IGHDsW9zIGNyZWVzIHF1ZSB2YW4gYSBsYSBlc2N1ZWxhIGVuOlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLCv1R1IGNvbXVuYT9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIsK/TGEgQ2l1ZGFkIGRlIEJ1ZW5vcyBBaXJlcz9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcXVpejtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuZmFjdG9yeSgnRXZlbnRCdXNTdmMnLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG5cdFxuXHQvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBTdWJzY3JpYmVzIGEgY2FsbGJhY2sgdG8gdGhlIGdpdmVuIGFwcGxpY2F0aW9uIHdpZGUgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHN1YnNjcmliZSB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIHdoaWNoIGlzIGZpcmUgd2hlbiB0aGUgZXZlbnQgaXMgcmFpc2VkLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRodCBjYW4gYmUgY2FsbGVkIHRvIHVuc3Vic2NyaXZlIHRvIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICB2YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gJHJvb3RTY29wZS4kb24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBCcm9hZGNhc3RzIHRoZSBnaXZlbiBldmVudCBhbmQgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGJyb2FkY2FzdC5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBBIGRhdGEgb2JqZWN0IHRoYXQgd2lsbCBiZSBwYXNzZWQgYWxvbmcgd2l0aCB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgYnJvYWRjYXN0ID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICRyb290U2NvcGUuJGVtaXQoZXZlbnROYW1lLCBkYXRhKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIGJyb2FkY2FzdDogYnJvYWRjYXN0XG4gICAgfTtcblxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnNlcnZpY2UoJ0xvY2F0aW9uSW5kaWNhdG9yU3ZjJywgZnVuY3Rpb24oJHEsICRodHRwLCAkZmlsdGVyKSB7XG5cbiAgICB2YXIgZ2V0UHJvdmluY2VMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICRodHRwLmdldChcImRhdGEvaW5kaWNhZG9yZXNfcHJvdmluY2lhLmpzb25cIikuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBkZWZlci5yZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBkZWZlci5yZWplY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdmFyIGdldERlcGFydG1lbnRMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICRodHRwLmdldChcImRhdGEvaW5kaWNhZG9yZXNfZGVwYXJ0YW1lbnRvLmpzb25cIikuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdOyBcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKHtpZDogZWxlbWVudC5kZXBhcnRhbWVudG9faWQsIG5hbWU6IGVsZW1lbnQuZGVwYXJ0YW1lbnRvX25vbWJyZSwgcHJvdmluY2VJZDogZWxlbWVudC5wcm92aW5jaWFfaWR9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVmZXIucmVzb2x2ZSgkZmlsdGVyKCdvcmRlckJ5JykobGlzdCwgJ25hbWUnKSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGRlZmVyLnJlamVjdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TmVpZ2hib3VyaG9vZExpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgICAgJGh0dHAuZ2V0KFwiZGF0YS9iYXJyaW9zX2NhYmEuanNvblwiKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107IFxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2goe2lkOiBlbGVtZW50LmNvbXVuYV9pZCwgbmFtZTogZWxlbWVudC5iYXJyaW9fbm9tYnJlLCBkZXBhcnRtZW50TmFtZTogZWxlbWVudC5jb211bmFfbm9tYnJlfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoJGZpbHRlcignb3JkZXJCeScpKGxpc3QsICduYW1lJykpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBkZWZlci5yZWplY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UHJvdmluY2VMaXN0OiBnZXRQcm92aW5jZUxpc3QsXG4gICAgICAgIGdldERlcGFydG1lbnRMaXN0OiBnZXREZXBhcnRtZW50TGlzdCxcbiAgICAgICAgZ2V0TmVpZ2hib3VyaG9vZExpc3Q6IGdldE5laWdoYm91cmhvb2RMaXN0XG4gICAgfTtcblxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLnNlcnZpY2UoJ1F1aXpTdmMnLCBmdW5jdGlvbigkcSwgJGh0dHAsIFF1aXpGYWN0b3J5KSB7XG5cbiAgICB2YXIgZ2V0U2VjdGlvbkRhdGEgPSBmdW5jdGlvbihzZWN0aW9uTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBRdWl6RmFjdG9yeVtzZWN0aW9uTnVtYmVyXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0U2VjdGlvbkRhdGE6IGdldFNlY3Rpb25EYXRhXG4gICAgfTtcblxufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZhY3RvcnkoJ1N0dWRlbnREYXRhU3ZjJywgZnVuY3Rpb24oKSB7XG5cdFxuICAgIHZhciBzdHVkZW50RGF0YSA9IHt9O1xuICAgIHZhciBzYXZlZERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0dWRlbnREYXRhXCIpO1xuICAgIGlmKHNhdmVkRGF0YSkge1xuICAgICAgICBzdHVkZW50RGF0YSA9IEpTT04ucGFyc2Uoc2F2ZWREYXRhKTtcbiAgICB9XG5cdFxuICAgIHZhciBjbGVhclN0dWRlbnREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3R1ZGVudERhdGFcIiwgSlNPTi5zdHJpbmdpZnkoe30pKTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFN0dWRlbnREYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzdHVkZW50RGF0YTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB1cGRhdGVTdHVkZW50RGF0YSA9IGZ1bmN0aW9uKG5ld1N0dWRlbnREYXRhKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3R1ZGVudERhdGFcIiwgSlNPTi5zdHJpbmdpZnkobmV3U3R1ZGVudERhdGEpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xlYXJTdHVkZW50RGF0YTogY2xlYXJTdHVkZW50RGF0YSxcbiAgICAgICAgZ2V0U3R1ZGVudERhdGE6IGdldFN0dWRlbnREYXRhLFxuICAgICAgICB1cGRhdGVTdHVkZW50RGF0YTogdXBkYXRlU3R1ZGVudERhdGFcbiAgICB9O1xuXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignSGVhZGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBFdmVudEJ1c1N2YywgU3R1ZGVudERhdGFTdmMpIHtcbiAgICBcbiAgICAkc2NvcGUuc3RlcCA9IHt9O1xuICAgICRzY29wZS5zdHVkZW50RGF0YSA9IFN0dWRlbnREYXRhU3ZjLmdldFN0dWRlbnREYXRhKCk7XG5cbiAgICAkc2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKCRzdGF0ZS5jdXJyZW50Lm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Jvb3Qud2VsY29tZSc6XG4gICAgICAgICAgICAgICAgU3R1ZGVudERhdGFTdmMuY2xlYXJTdHVkZW50RGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyb290LnNpZ25VcEZvcm0uc3R1ZGVudERhdGEnOlxuICAgICAgICAgICAgXHRFdmVudEJ1c1N2Yy5icm9hZGNhc3QoJ3VwZGF0ZVN0ZXAnLCB7IG5hbWU6ICdQcmltZXIgcGFzbyAxJywgbnVtYmVyOiAxfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIEV2ZW50QnVzU3ZjLnN1YnNjcmliZSgndXBkYXRlQ2xhc3NDb2RlJywgZnVuY3Rpb24oZXZlbnQsIGNsYXNzQ29kZSkge1xuICAgIFx0JHNjb3BlLnN0dWRlbnREYXRhLmNsYXNzQ29kZSA9IGNsYXNzQ29kZTtcbiAgICB9KTtcblxuICAgIEV2ZW50QnVzU3ZjLnN1YnNjcmliZSgndXBkYXRlU3RlcCcsIGZ1bmN0aW9uKGV2ZW50LCBzdGVwKSB7XG4gICAgXHQkc2NvcGUuc3RlcE5hbWUgPSBzdGVwLm5hbWU7XG4gICAgXHQkc2NvcGUuc3RlcE51bWJlciA9IHN0ZXAubnVtYmVyO1xuICAgIH0pO1xuXG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKS5jb250cm9sbGVyKCdRdWl6U2VjdGlvbjFDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgRXZlbnRCdXNTdmMsIFN0dWRlbnREYXRhU3ZjLCBRdWl6U3ZjKSB7XG4gICAgXG4gICAgJHNjb3BlLnN0dWRlbnREYXRhID0gU3R1ZGVudERhdGFTdmMuZ2V0U3R1ZGVudERhdGEoKTtcbiAgICAkc2NvcGUuc2VjdGlvbkRhdGEgPSBRdWl6U3ZjLmdldFNlY3Rpb25EYXRhKCRzdGF0ZS5jdXJyZW50LmRhdGEuc3RlcE51bWJlcik7XG4gICAgJHNjb3BlLnBhZ2VEYXRhID0gJHNjb3BlLnNlY3Rpb25EYXRhLnBhZ2VzWyRzdGF0ZVBhcmFtcy5wYWdlTnVtYmVyXTtcbiAgIFxuICAgICRzY29wZS5nb1RvTmV4dFBhZ2UgPSBmdW5jdGlvbihwYWdlTnVtYmVyKSB7XG4gICAgICAgIGlmKHBhZ2VOdW1iZXIpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbyhcInJvb3QucXVpelNlY3Rpb24xLnF1ZXN0aW9uXCIsIHsgcGFnZU51bWJlcjogcGFnZU51bWJlcn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHN0YXRlLmdvKFwicm9vdC5xdWl6U2VjdGlvbjEucmVzdWx0XCIpO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignc2lnblVwRm9ybUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGZpbHRlciwgRXZlbnRCdXNTdmMsIFN0dWRlbnREYXRhU3ZjLCBMb2NhdGlvbkluZGljYXRvclN2Yykge1xuXG5cdHZhciBhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuXHQgICAgJHNjb3BlLnN0dWRlbnREYXRhID0gU3R1ZGVudERhdGFTdmMuZ2V0U3R1ZGVudERhdGEoKTtcblx0ICAgIExvY2F0aW9uSW5kaWNhdG9yU3ZjLmdldFByb3ZpbmNlTGlzdCgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXHQgICAgXHQkc2NvcGUucHJvdmluY2VMaXN0ID0gZGF0YTtcblx0ICAgIH0pO1xuXHQgICAgJHNjb3BlLmRlcGFydG1lbnRMaXN0ID0gW107IFxuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlRGVwYXJ0bWVudExpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYoJHNjb3BlLnN0dWRlbnREYXRhLnByb3ZpbmNlSWQgPT0gMikgeyAvLyBDQUJBXG4gICAgICAgICAgICBMb2NhdGlvbkluZGljYXRvclN2Yy5nZXROZWlnaGJvdXJob29kTGlzdCgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kZXBhcnRtZW50TGlzdCA9IGRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgXHRMb2NhdGlvbkluZGljYXRvclN2Yy5nZXREZXBhcnRtZW50TGlzdCgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5kZXBhcnRtZW50TGlzdCA9ICRmaWx0ZXIoJ2ZpbHRlcicpKGRhdGEsIHtwcm92aW5jZUlkOiAkc2NvcGUuc3R1ZGVudERhdGEucHJvdmluY2VJZH0sIHRydWUpO1xuICAgIFx0ICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS4kd2F0Y2goXCJzdHVkZW50RGF0YS5wcm92aW5jZUlkXCIsIGZ1bmN0aW9uKCl7XG4gICAgXHR1cGRhdGVEZXBhcnRtZW50TGlzdCgpO1xuICAgIH0pO1xuICAgIFxuICAgICRzY29wZS5zYXZlQ2xhc3NDb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgXHQkc3RhdGUuZ28oXCJyb290LnNpZ25VcEZvcm0uc3R1ZGVudERhdGFcIik7XG4gICAgXHRTdHVkZW50RGF0YVN2Yy51cGRhdGVTdHVkZW50RGF0YSgkc2NvcGUuc3R1ZGVudERhdGEpO1xuICAgIFx0RXZlbnRCdXNTdmMuYnJvYWRjYXN0KCd1cGRhdGVDbGFzc0NvZGUnLCAkc2NvcGUuc3R1ZGVudERhdGEuY2xhc3NDb2RlKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNhdmVTdHVkZW50RGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgIFx0U3R1ZGVudERhdGFTdmMudXBkYXRlU3R1ZGVudERhdGEoJHNjb3BlLnN0dWRlbnREYXRhKTtcbiAgICAgICAgJHN0YXRlLmdvKFwicm9vdC5xdWl6U2VjdGlvbjEucXVlc3Rpb25cIiwgeyBwYWdlTnVtYmVyOiAxfSk7XG4gICAgfTtcbiAgICBcbiAgICBhY3RpdmF0ZSgpO1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJykuY29udHJvbGxlcignd2VsY29tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICBcbn0pO1xuIl19
