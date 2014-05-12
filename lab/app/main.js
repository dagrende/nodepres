angular.module('TTTApp', [])
.controller('BoardCtrl', function($scope) {
	$scope.board = [
		[1,2,0],
		[0,0,0],
		[0,0,0]];
	$scope.mySide = 1;

	$scope.imgByIndex = function(row, col) {
		var v = $scope.board[row][col];
		if (v==0) {
			return "empty.png";
		} else if (v == 1) {
			return "o.png";
		} else if (v == 2) {
			return "x.png";
		}
	}

	// return the winner mark if any
	function winnerMark() {
		var first;
		for(i in [0, 1, 2]) {
			first = $scope.board[i][0];
			if (first != 0 && first == $scope.board[i][1] && first == $scope.board[i][2]) {
				return first;
			}
			first = $scope.board[0][i];
			if (first != 0 && first == $scope.board[1][i] && first == $scope.board[2][i]) {
				return first;
			}
		}
		first = $scope.board[1][1];
		if (first != 0 && first == $scope.board[0][0] && first == $scope.board[2][2]) {
			return first;
		}
		if (first != 0 && first == $scope.board[0][2] && first == $scope.board[2][0]) {
			return first;
		}
		return 0;
	}

	$scope.boardClick = function(row, col) {
		console.log(row, col);
		if ($scope.board[row][col] == 0) {
			$scope.board[row][col] = $scope.mySide;
			var winner = winnerMark();
			if (winner != 0) {
				console.log("winner is " + winner);
			}
		}
	}

});