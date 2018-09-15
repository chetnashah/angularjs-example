console.log('ran app.js');

var module = angular.module('myModule', ['ngFileUpload', 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput']);

module.provider("myProvider", function() {
    // only called once, return value memoized
    this.$get = function() {
        console.log('executing providers\' this.$get');
        return "my value";
    }
});

// run block
module.run(['$rootScope', function($rootScope) {
    $rootScope.companyName = 'Googly';
}]);

// similar to provider without the this.$get boilerplate
module.factory("myProvider", function() {
        console.log('executing factory fn');
        return "my factory-value";
});

module.controller('FileCtrl', ['$scope', 'Upload', function($scope, Upload){
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
module.controller('myController', ['myProvider', '$scope' ,function(myProvider, $scope){
    console.log('myController execution');
    console.log('myProvider : ' + myProvider);
    $scope.c = 999;
}]);

module.controller('myController2', ['myProvider' ,function(myProvider){
    console.log('myController2 execution');
    console.log('myProvider : ' + myProvider);
}]);

module.directive('firstDirective', function(){
    // this directive uses the scope of the container
    return {
        template: "I am custom-directive without scope specified, so c = {{c}}"
    };
});

module.directive('secondDirective', function(){
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

module.directive('thirdDirective', function(){
    return {
        template: "I am template for third directive..",
        // below field introduces scope for directive
        scope: true
    };
});

module.controller('CounterController', ['$scope' ,function($scope){
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

module.controller('OkController', ['$scope', function($scope){
    console.log('OkController');
}]);

module.directive('look', function(){
    return {
        template: "<div>look directive contents<div ng-transclude></div></div>",
        transclude: true// transclude should be used when we want ot capture
        // content of the markup where this directive is applied.
    };
});

module.directive('fourthDirective', function(){
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

module.controller('CntController', ['$scope','$rootScope','$controller', function($scope, $rootScope, $controller){
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
}]);

module.controller('SCtrl', ['$scope', function($scope) {
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

module.controller('SSController', function(){
    // this is converted into class instance property
    // name of instance is specfied in html via
    // SSController as instName
    this.title = "SSController title!";
    this.details = {
        name: 'JOhn',
        age: 229
    };
});

module.component('myComponent', {
    bindings: {
        subtitle: '@',// get string value from subtitle attribute
        details: '='// get  details attribute value treated as expr 
    },
    template: "<div><h3>Subtitle</h3><p>{{$ctrl}}</p></div>"
});