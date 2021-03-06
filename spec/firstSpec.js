
describe('firsttest',() => {
    it('first it of first test', (done) => {
        expect(1+1).toBe(2);
        done();
    })
});

describe('PasswordController', function() {
  console.log('module->', module);
  beforeEach(module('myModule'));

  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', inject(
      function($rootScope, $controller) {
        var $scope = $rootScope.$new();
        var controller = $controller('PasswordController', { $scope: $scope });
        $scope.password = 'longerthaneightchars';
        $scope.grade();
        expect($scope.strength).toEqual('strong');
      })
    );
  });
});
