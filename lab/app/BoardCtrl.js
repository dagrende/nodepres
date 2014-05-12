function BoardCtrl($scope) {
	$scope.board = [[1,2,0],[0,0,0],[0,0,0]];

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

	function clickMove(row, col) {
		console.log(row, col);
	}
}