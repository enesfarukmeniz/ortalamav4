angular.module('ortalamav4', [])
    .controller('AppController', function ($scope) {

        $scope.lessons = [];
        $scope.lessonForm = {
            lessons: {}
        };

        $scope.addNew = function () {
            if ($scope.lessons.length) {
                $scope.lessons.push($scope.lessons[$scope.lessons.length - 1] + 1);
            } else {
                $scope.lessons.push(0)
            }
            $scope.result();
        };

        $scope.remove = function (index) {
            $scope.lessons.splice($scope.lessons.indexOf(index), 1)
            delete $scope.lessonForm.lessons[index];
            $scope.result();
        };

        $scope.result = function () {
            var totalCredit = $scope.lessonForm.oldCredit;
            var oldGPA = $scope.lessonForm.oldGPA;
            var totalPoint = totalCredit * oldGPA;
            var currentCredit = 0, currentPoint = 0;

            for (var lesson in $scope.lessonForm.lessons) {
                currentCredit += parseFloat($scope.lessonForm.lessons[lesson].credit);
                currentPoint += parseFloat($scope.lessonForm.lessons[lesson].credit) * parseFloat($scope.lessonForm.lessons[lesson].mark);
                if ($scope.lessonForm.lessons[lesson].old) {
                    totalCredit -= parseFloat($scope.lessonForm.lessons[lesson].credit);
                    totalPoint -= parseFloat($scope.lessonForm.lessons[lesson].credit) * parseFloat($scope.lessonForm.lessons[lesson].oldMark);
                }
            }
            totalPoint += currentPoint;
            totalCredit += currentCredit;

            var currentGPA = (currentPoint / currentCredit).toFixed(2);
            var newGPA = (totalPoint / totalCredit).toFixed(2);

            $scope.currentGPA = currentGPA;
            $scope.newGPA = newGPA;

            $scope.error = $scope.newGPA > 4 || $scope.newGPA < 0 || isNaN($scope.newGPA)
                || $scope.currentGPA > 4 || $scope.currentGPA < 0 || isNaN($scope.currentGPA);
        };

        $scope.addNew();

    });
