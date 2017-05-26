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


window.hasVerticalConflicts = function(matrix) {
  var sumOfCols = [].concat(matrix[0]);
  for (var i = 1; i < matrix.length; i++) {
    var row = matrix[i];
    for (var j = 0; j < row.length; j++) {
      sumOfCols[j] += row[j];
      if (sumOfCols[j] > 1) {
        return true;
      }
    } 
  }
  //console.log(sumOfCols);
  return false;
};

window.populateRowBank = function(n, rowBank) {
  var row = [];
  row.length = n;
  row.fill(0);
  for (var i = 0; i < n; i++) {
    row[i] = 1;
    rowBank.push([[].slice.call(row)]);
    row[i] = 0;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  console.log('n: ');
  var solutionCount = 0;
  var rowBank = [];
  var sequences = [];

  window.populateRowBank(n, rowBank);
  //console.log(rowBank);
  
  // var fillEmptyBoardSpots = function(incompleteBoard, n) {
  //   var boardWithEmpties = [].slice.call(incompleteBoard);
  //   var blankArray = [];
  //   blankArray.length = n;
  //   blankArray.fill(0);
  //   while (boardWithEmpties.length < n) {
  //     boardWithEmpties.push(blankArray);
  //   }
  //   return boardWithEmpties;
  // };

  var makeSequences = function (rowsToGo, boardSoFar) {
    if (rowsToGo === 0) {
      // var testBoard = new Board(boardSoFar);
      if (!window.hasVerticalConflicts(boardSoFar)) {
        solutionCount++;
      }
      console.log('solution count: ', solutionCount);
      return;
    }
    
    for (var i = 0; i < rowBank.length; i++) {
      var currentRow = rowBank[i];
      console.log('boardSoFar', JSON.stringify(boardSoFar));
      console.log('boardSoFar.length', boardSoFar.length);
      if (boardSoFar.length > 1) {
        // var halfFullBoard = fillEmptyBoardSpots(boardSoFar.concat(currentRow), n);
        // var testBoard = new Board(halfFullBoard);
        console.log('hasVerticalConflicts: ', window.hasVerticalConflicts(boardSoFar.concat(currentRow)));
        
        if (!window.hasVerticalConflicts(boardSoFar.concat(currentRow))) {
          // console.log('has conflict ', window.hasVerticalConflicts(boardSoFar));
          makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
        }
      } else {
        console.log('here');
        makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
      }
    }
  };
  makeSequences(n, []);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    debugger;

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


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
  

  n = 4;
  var createEmptyGrid = function(n) {
    var positions = [];
    for (var x = 0; x < n; x++) {
      var arr = [];
      arr.length = n;
      arr.fill(0);
      positions.push(arr);
    }
    return positions;
  };
  
  
  var renderOffLimitsPositions = function(row, col) {
    var grid = createEmptyGrid(n);
    
    
    //vertical positions
    for (let y = 0; y < n; y++) {
      grid[row][y] = 1;
      
    }
    //horizontal postion
    for (let x = 0; x < n; x++) {
      grid[x][col] = 1;
    }
    
    //major position up;
    var x = row - 1;
    var y = col - 1;
    while (x >= 0 && y >= 0) {
      grid[x][y] = 1;
      x--;
      y--;
    }
    
    //major position down;
    x = row + 1;
    y = col + 1;
    while (x < n && y < n) {
      grid[x][y] = 1;
      x++;
      y++;
    }
    
    //minor position up;
    x = row - 1;
    y = col + 1;
    while (x >= 0 && y < n) {
      grid[x][y] = 1;
      x--;
      y++;
    }
    
    //minor position down;
    x = row + 1;
    y = col - 1;
    while (x < n && y >= 0) {
      grid[x][y] = 1;
      x++;
      y--;
    }
    
    return grid;
  };
  
  var renderValidPositions = function(grid) {
    var positions = [];
    grid.forEach(function(row, i) {
      row.forEach(function(elem, j) {
        positions.push(i, j);
      });
    });
    return positions;
  };
  
  var board = new Board({n: n});
  var validPos = renderValidPositions(grid);

  //for each spot on the board
  var solutions = {};
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      var findSpot = function(spotsLeft, board) {
        if (spotsLeft === 0) {
          if (board.hasAnyQueensConflicts()) {
            solutions[JSON.stringify(board.rows())] = 1;
          }
          return;
        }
        
        validPos.forEach(pos => {
          board.togglePiece(pos[0], pos[1]);
          if (board.hasAnyQueensConflicts()) {
            board.togglePiece(pos[0], pos[1]);
          }
          findSpot(spotsLeft - 1, board);
        });
      };
    }
  }
    //toggle spot
    //recurse function
    //for each validPos
      //toggle spot
      //if (conflicts)
        //toggle spot back
      //invoke recursion(board, spotsLeft)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // var solutionCount = 0;
  // var rowBank = [];
  // var sequences = [];

  // var populateRowBank = function(n) {
  //   var row = [];
  //   row.length = n;
  //   row.fill(0);
  //   for (var i = 0; i < n; i++) {
  //     row[i] = 1;
  //     rowBank.push([[].slice.call(row)]);
  //     row[i] = 0;
  //   }
  // };
  // populateRowBank(n);
  
  // var fillEmptyBoardSpots = function(incompleteBoard, n) {
  //   var boardWithEmpties = [].slice.call(incompleteBoard);
  //   var blankArray = [];
  //   blankArray.length = n;
  //   blankArray.fill(0);
  //   while (boardWithEmpties.length < n) {
  //     boardWithEmpties.push(blankArray);
  //   }
  //   return boardWithEmpties;
  // };

  // var makeSequences = function (rowsToGo, boardSoFar) {
  //   if (rowsToGo === 0) {
  //     var testBoard = new Board(boardSoFar);
  //     if (!testBoard.hasAnyQueensConflicts()) {
  //       solutionCount++;
  //     }
  //     return;
  //   }
  //   for (var i = 0; i < rowBank.length; i++) {
  //     var currentRow = rowBank[i];
  //     if (boardSoFar.length > 1) {
  //       var halfFullBoard = fillEmptyBoardSpots(boardSoFar.concat(currentRow), n);
  //       var testBoard = new Board(halfFullBoard);
  //       if (!testBoard.hasAnyQueensConflicts()) {
  //         makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
  //       }
  //     } else {
  //       makeSequences(rowsToGo - 1, boardSoFar.concat(currentRow));
  //     }
  //   }
  // };
  // makeSequences(n, []);
  
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
};

