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
  };


  for (var x = 0; x < n; x++) {
    for (var y = 0; y < n; y++) {
      addPieces(x, y);
    }
  }

  solution = [...solution][0];


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var rowBank = [];
  var sequences = [];

  var populateRowBank = function(n) {
    var row = [];
    row.length = n;
    row.fill(0);
    for (var i = 0; i < n; i++) {
      row[i] = 1;
      rowBank.push([[].slice.call(row)]);
      row[i] = 0;
    }
  };
  populateRowBank(n);
  
  var fillEmptyBoardSpots = function(incompleteBoard, n) {
    var boardWithEmpties = [].slice.call(incompleteBoard);
    var blankArray = [];
    blankArray.length = n;
    blankArray.fill(0);
    while (boardWithEmpties.length < n) {
      boardWithEmpties.push(blankArray);
    }
    return boardWithEmpties;
  };

  var makeSequences = function (rowsToGo, boardSoFar) {
    if (rowsToGo === 0) {
      var testBoard = new Board(boardSoFar);
      if (!testBoard.hasAnyRooksConflicts()) {
        solutionCount++;
      }
      return;
    }
    for (var i = 0; i < rowBank.length; i++) {
      var currentRow = rowBank[i];
      var halfFullBoard = fillEmptyBoardSpots(boardSoFar.concat(currentRow), n);
      var testBoard = new Board(halfFullBoard);
      if (!testBoard.hasAnyRooksConflicts()) {
        makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
      }
    }
  };
  makeSequences(n, []);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // console.log('n: ', n);
  // var solution = [];

  // var findSolutions = function(row, boardSoFar) {
  //   console.log('boardSoFar', boardSoFar);
  //   var board = new Board(boardSoFar);
  //   if (piecesLeft === 0) {
  //     solution.push(board.rows());
  //     return;
  //   }
  //   for (var rowIndex = 0; rowIndex < n; rowIndex++ ) {
  //     for (var columnIndex = 0; columnIndex < n; columnIndex++) {
  //       console.log('rowIndex: ', rowIndex, 'columnIndex: ', columnIndex);
  //       if (board.get(rowIndex)[columnIndex] === 0) {
  //         board.togglePiece(rowIndex, columnIndex);
  //         piecesLeft--;
  //       }
  //       if (board.hasAnyQueensConflicts()) {
  //         board.togglePiece(rowIndex, columnIndex);
  //         piecesLeft++;
  //       }
  //       console.log('board here', board.rows());
  //       return findSolutions(piecesLeft, board.rows());
  //     }
  //   }
  // };
  // var board = new Board({n: n});
  // console.log('this board: ', board.rows());
  // findSolutions(n, board);

  // console.log(JSON.stringify(solution));
  // // var test = new Board({n: 2});
  // // console.log('test: ', test.rows())
  // // console.log('get: ', test.get('n'));

  // return solution;


/* Find all combinations of 2 numbers on a 2 x 2 grid*/











  var solution = [];
  var addPieces = function(initialRowPos, initialColumnPos) {
    var board = new Board({n: n});
    board.togglePiece(initialRowPos, initialColumnPos);
    for (var rowIndex = 0; rowIndex < n; rowIndex++) {
      for (var colIndex = 0; colIndex < n; colIndex++) {
        if (board.get(rowIndex)[colIndex] < 1) {
          board.togglePiece(rowIndex, colIndex);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(rowIndex, colIndex);
          }
        }
      }
    }
    return board;
  };
  
  if (n === 2) {
    solution = [[], []];
  } else if (n === 3) {
    solution = [[], [], []];
  }


  for (var initialRowPos = 0; initialRowPos < n; initialRowPos++) {
    for (var initialColumnPos = 0; initialColumnPos < n; initialColumnPos++) {
      var setBoard = addPieces(initialRowPos, initialColumnPos).rows();
      var sum = _.flatten(setBoard).reduce((acc, cur) => acc + cur);
      if (sum === n) {
        solution = setBoard;
      }
    }
  }


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nXn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var rowBank = [];
  var sequences = [];

  var populateRowBank = function(n) {
    var row = [];
    row.length = n;
    row.fill(0);
    for (var i = 0; i < n; i++) {
      row[i] = 1;
      rowBank.push([[].slice.call(row)]);
      row[i] = 0;
    }
  };
  populateRowBank(n);
  
  var fillEmptyBoardSpots = function(incompleteBoard, n) {
    var boardWithEmpties = [].slice.call(incompleteBoard);
    var blankArray = [];
    blankArray.length = n;
    blankArray.fill(0);
    while (boardWithEmpties.length < n) {
      boardWithEmpties.push(blankArray);
    }
    return boardWithEmpties;
  };

  var makeSequences = function (rowsToGo, boardSoFar) {
    if (rowsToGo === 0) {
      var testBoard = new Board(boardSoFar);
      if (!testBoard.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      return;
    }
    for (var i = 0; i < rowBank.length; i++) {
      var currentRow = rowBank[i];
      var halfFullBoard = fillEmptyBoardSpots(boardSoFar.concat(currentRow), n);
      var testBoard = new Board(halfFullBoard);
      if (!testBoard.hasAnyQueensConflicts()) {
        makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
      }
    }
  };
  makeSequences(n, []);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

