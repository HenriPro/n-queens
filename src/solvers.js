/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var count = 0;
  var solution = new Set();

  var addPieces = function(x, y) {
    var board = new Board({n: n});
    board.togglePiece(x, y);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (board.get(i)[j] < 1) {
          board.togglePiece(i, j);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
          }
        }
      }
    }
    var sum = _(board.rows()).flatten().reduce(((acc, cur) => acc + cur));
    if (!board.hasAnyRooksConflicts() && sum === n) {
      solution.add(board.rows());
    }
      count++;
  }


  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      addPieces(x,y)
    }
  }

  solution = [...solution][0];


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var solution = new Set();

  var addPieces = function(x, y) {
    var board = new Board({n: n});
    board.togglePiece(x, y);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (board.get(i)[j] < 1) {
          board.togglePiece(i, j);
          if (board.hasAnyRooksConflicts()) {
            board.togglePiece(i, j);
          }
        }
      }
    }
    // console.log('increase count truth test: ', !board.hasAnyRooksConflicts());
    var sum = _(board.rows()).flatten().reduce(((acc, cur) => acc + cur));
    if (!board.hasAnyRooksConflicts() && sum === n) {
      // console.log('sum', sum);
      // console.log('board: ', board.rows())
      solution.add(JSON.stringify(board.rows()));
    }
    // count++;
  }


  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      addPieces(x,y)
    }
  }

  // solution = [...solution];
  // console.log('count: ', count);
  // console.log(solution);

  var solutionCount = solution.size; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // console.log('n: ', n);
  // var solutions = [];

  // var findSolutions = function(piecesLeft, boardSoFar) {
  //   if (piecesLeft === 0) {
  //     solutions.push(boardSoFar.rows());
  //     return;
  //   }
  //   for (var i = 0; i < n; i++ ) {
  //     for (var j = 0; j < n; j++) {
  //       boardSoFar.togglePiece(i, j);
  //       piecesLeft--;
  //       if (boardSoFar.hasAnyQueensConflicts()) {
  //         boardSoFar.togglePiece(i, j);
  //         piecesLeft++;
  //       }
  //       return findSolutions(n, boardSoFar);
  //     }
  //   }
  // }
  // var board = new Board(n);
  // findSolutions(n, board);

  // console.log(solutions);

  // return solutions;










  var count = 0;
  var solution = [];
  var addPieces = function(x, y) {
    console.log('here')
    var board = new Board({n: n});
    console.log('board.get(n): ',   board.get('n'));
    board.togglePiece(x, y);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (board.get(i)[j] < 1) {
          board.togglePiece(i, j);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(i, j);
          }
        }
      }
    }
    return board;
    // var sum = _(board.rows()).flatten().reduce(((acc, cur) => acc + cur));
    // console.log('sum', sum);
    // if (!board.hasAnyQueensConflicts() && sum === n) {
    //   if (!solution.includes(JSON.stringify(board.rows()))) {
    // // console.log('board', JSON.stringify(board.rows()));
    //   solution.push(board.rows());
    //   // console.log(board.rows());
    //   }
    //   count++;
    // }
  }


  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      // solution = addPieces(x, y).rows();
      var setBoard = addPieces(x,y).rows();
      console.log('setBoard', Array.isArray(setBoard));
      var sum = _.flatten(setBoard).reduce((acc, cur) => acc + cur);
      console.log('sum: ', sum, 'n: ', n);
      if (sum === n) {
  // console.log('solution', setBoard.get('n'));
        solution = setBoard;
        count++
      }
      // solution.push(config.rows());
      // console.log('config ', config.rows());
    }
  }

  console.log('count', count);
  console.log('solution', solution);
  // solution = solution[0];
  // var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
