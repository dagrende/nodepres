angular.module('TTTApp', [])
.controller('BoardCtrl', function($scope, $timeout) {
	clearBoard();
	$scope.mySide = 2;
	$scope.myName = '';
	$scope.otherNameSide = '';
	$scope.gameStatus = '';

	var socket = io.connect();

  	socket.on('start-game', function (data) {
		$timeout(function() {
			console.log('play from ',data.name,'side',data.side);
	  		$scope.mySide = otherside(data.side);
  			$scope.yourName = data.name;
  			$scope.otherNameSide = data.name + ' ' + $scope.sideLetter(data.side);
  			$scope.gameStatus = 'Game';
  			clearBoard();
		});
  	});

  	socket.on('turn', function (data) {
		console.log('turn', data);
		$timeout(function() {
			turn(otherside($scope.mySide), data.row, data.col);
			$scope.$apply();
		});
	});

	function clearBoard() {
		$scope.board = [	// 0=empty, 1=O, 2=X
			[0,0,0],
			[0,0,0],
			[0,0,0]];
	}


	function otherside(side) {
		return [0, 2, 1][side];
	}

	$scope.sideLetter = function(side) {
		return ['', 'O', 'X'][side];
	}

	$scope.play = function() {
		clearBoard();
  		$scope.gameStatus = 'Game';
		socket.emit('want-to-play', {name:$scope.myName, side:$scope.mySide});
	};

	$scope.boardClick = function(row, col) {
		console.log(row, col);
		if ($scope.board[row][col] == 0) {
			turn($scope.mySide, row, col);
			socket.emit('turn', {row:row, col:col});
		}
	}

	function turn(side, row, col) {
		$scope.board[row][col] = side;
		var winner = winnerSide();
		if (winner != 0) {
			console.log("winner is " + winner);
			$scope.gameStatus = (winner == $scope.mySide ? '<' : '') + 'Winner' + (winner != $scope.mySide ? '>' : '');
		}
	}

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
	function winnerSide() {
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

});