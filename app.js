console.log('ran app.js');

var mymodule = angular.module('myModule', ['ngFileUpload', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput', 'ui.router']);

mymodule.config(function($stateProvider, $locationProvider){
   $locationProvider.html5Mode({ enabled: true, requireBase: false })

    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h1>This is hello route content</h1>'
    };
    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h2>This is about!!!</h2>'
    };

    var careersState = {
        name: 'careers',
        url: '/careers',
        component: 'careers'
    };

    var careerDepartmentState = { 
     name: 'careers.department', 
     url: '/{departmentId}', 
     component: 'department',
    }

    var welcomeState = {
        name: 'welcome',
        url: '/welcome/{wid}',// dynamic part of url managed by $stateParams
        component: 'welcome'
    }

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
    $stateProvider.state(careersState);
    $stateProvider.state(welcomeState);
    $stateProvider.state(careerDepartmentState);

});

angular.module('myModule').component('welcome', {
    controller: function($stateParams) {
        this.a = 11;
        this.wid = $stateParams.wid;
    },
    template: '<h2>Welcome: {{$ctrl.a}} , stateParam id : {{$ctrl.wid}}</h2>'
});

angular.module('myModule').component('department', {
    controller: function($stateParams) {
        this.did = $stateParams.departmentId;
    },
    template: '<h2>Department: {{$ctrl.did}}</h2>'
});


angular.module('myModule').component('careers',{
    controller: function(){
    },
    templateUrl: 'careers.html'
})

angular.module('myModule').provider("myProvider", function() {
    // only called once, return value memoized
    this.$get = function() {
        console.log('executing providers\' this.$get');
        return "my value";
    }
});

// run block
mymodule.run(['$rootScope', function($rootScope) {
    $rootScope.companyName = 'Googly';
}]);

// similar to provider without the this.$get boilerplate
mymodule.factory("myProvider", function() {
        console.log('executing factory fn');
        return "my factory-value";
});

angular.module('myModule').controller('FileCtrl', ['$scope', 'Upload', function($scope, Upload){
    $scope.submit = function(){
        console.log('submitting shit');
        console.log('fileform = ', $scope.fileform);
        console.log('$scope.file = ', $scope.file);
        console.log('$scope.fileform.file = ', $scope.fileform.file);
        // name="file" published it to fileform
        // ng-model="file" published it to scope
        if ($scope.fileform.file.$valid && $scope.file) {
            console.log('file was selected and file was valid');
            $scope.upload($scope.file);
        }
    }
    $scope.upload = function (file) {
        console.log('uploading a file!!');
        Upload.upload({
            url: 'http://localhost:6000/postinfo',
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
}])
mymodule.controller('myController', ['myProvider', '$scope', '$state', function(myProvider, $scope, $state){
    console.log('myController execution');
    console.log('myProvider : ' + myProvider);
    $scope.c = 999;
    $scope.goToAbout = function(){
        $state.go('about');
    }
    $scope.goToHello = function(){
        $state.go('hello');
    }
    $scope.goToCareers = function(){
        $state.go('careers');
    }

    $scope.goToWelcome = function(){
        $state.go('welcome', {wid: 111})
    }
    
}]);

mymodule.controller('myController2', ['myProvider' ,function(myProvider){
    console.log('myController2 execution');
    console.log('myProvider : ' + myProvider);
}]);

mymodule.directive('firstDirective', function(){
    // this directive uses the scope of the container
    return {
        template: "I am custom-directive without scope specified, so c = {{c}}"
    };
});

angular.module('myModule').directive('secondDirective', function(){
    return {
        template: "I am a template for sencond-directive, z = {{z}}",
        // controller constructor fn
        //the $scope passed in is same as that of container
        // of this directive
        controller: function($scope, $element, $attrs) {
            $scope.z = 11;
        }
    };
});

mymodule.directive('thirdDirective', function(){
    return {
        template: "I am template for third directive..",
        // below field introduces scope for directive
        scope: true
    };
});

angular.module('myModule').controller('CounterController', ['$scope' ,function($scope){
    $scope.count = 0;
    $scope.$watch(function($scope){
        return $scope.count;
    },function(newValue, oldValue){
        console.log('watch expression value changed! '+ oldValue + ' -> '+newValue);
    });

    $scope.$on('cnt', function(event, args){
        console.log(args);
        $scope.count = args;
    });
    // setTimeout is outside control of angularjs, put inside code
    // in a $apply
    // setInterval(function(){
    //     $scope.$apply(function(){
    //         $scope.count = $scope.count + 5;
    //     });
    // }, 1500);
    $scope.hasPerm = '';
    setTimeout(function(){
        $scope.$apply(function(){
            Notification.requestPermission(function(status){
                console.log('notification perm status: ', status);
                $scope.hasPerm = status;
            })
        });
    }, 5000);
    setTimeout(function(){
        // just create a notification to show it
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
        notification.addEventListener('click', function(ev){
            console.log('clicked on notification, ev = ', ev);
            // jumps to browser tab
            window.focus();
            ev.target.close();
        });
        notification.addEventListener('show', function(){
            console.log('notification shown');
        });
        notification.addEventListener('close', function(){
            console.log('notification closed');
        });
    }, 7000);
    // Upload.upload({});
    //
}]);

mymodule.controller('OkController', ['$scope', function($scope){
    console.log('OkController');
}]);

mymodule.directive('look', function(){
    return {
        template: "<div>look directive contents<div ng-transclude></div></div>",
        transclude: 'true'// transclude should be used when we want ot capture
        // content of the markup where this directive is applied.
    };
});

mymodule.directive('fourthDirective', function(){
    return {
        templateUrl: "fourthdir.html",
        transclude: true,
        link: function(scope, iElement, iAttrs, controller, transclude) {
            console.log('fourth-directive, link function!');
            // get content of original markup by calling transclude()
            var content = transclude();
            console.log(content);
            console.log(iElement[0]);
            var found = iElement[0].querySelectorAll('#innerPanel');
            console.log(found);
            found[0].innerHTML = content[0].textContent;
        }
    };
});

mymodule.controller('CntController', ['$scope','$rootScope','$controller', '$filter', function($scope, $rootScope, $controller, $filter){
    console.log('CntController');
    $scope.count = 0;
    $scope.increment = function(){
        $scope.count = $scope.count + 1;
        $rootScope.$broadcast('cnt', $scope.count);
    };
    $scope.decrement = function(){
        $scope.count = $scope.count - 1;
        $rootScope.$emit('cnt',$scope.count);
    }

    $scope.originalArr = [{a:7},{a : 6} ,{a : 5},{a: 4},{ a: 3},{a: 2} ,{a : 1}];
    console.log($scope.originalArr);
    $scope.retArr = $filter('orderBy')($scope.originalArr, function(item){ return item.a});
    $scope.retArr[0].a = 999;
    console.log($scope.originalArr);
    console.log($scope.retArr);
}]);

mymodule.controller('SCtrl', ['$scope', function($scope) {
    console.log('some reg happening');
    $scope.data = {};
    $scope.data.dateDropDownInput = new Date(2011,12,22);
    $scope.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
        var index = Math.floor(Math.random() * $dates.length);
        $dates[index].selectable = false;
    }
    
    $scope.sendSelectedDate = function(){
        console.log('isMoment->', moment.isMoment($scope.data.dateDropDownInput));
        console.log('moment.isDate->', moment.isDate($scope.data.dateDropDownInput));
        console.log("sending->");
        console.log(moment($scope.data.dateDropDownInput.toISOString()).format('DD-MM-YYYY'));
    }

    $scope.onTimeSet = function (newDate, oldDate) {
        console.log(newDate);
        console.log(oldDate);
    }
}]);

mymodule.controller('SSController', function(){
    // this is converted into class instance property
    // name of instance is specfied in html via
    // SSController as instName
    this.title = "SSController title!";
    this.details = {
        name: 'JOhn',
        age: 229
    };
    this.originalArr = [{a:7},{a : 6} ,{a : 5},{a: 4},{ a: 3},{a: 2} ,{a : 1}];

});

mymodule.component('myComponent', {
    bindings: {
        subtitle: '@',// get string value from subtitle attribute
        details: '='// get  details attribute value treated as expr 
    },
    template: "<div><h3>Subtitle</h3><p>{{$ctrl}}</p></div>"
});

mymodule.controller('ExampleFormController', function ExampleFormController($scope){

    $scope.checkForm = function(){
        console.log('checking form!');
        console.log($scope.inp);
        console.log('$scope.exForm.nm = ', $scope.exForm.nm);
    }
});

mymodule.controller('PasswordController', function PasswordController($scope){
   $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };   
})

