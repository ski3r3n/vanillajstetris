// making tetris in vanilla html

console.log("vanllia js is fun surely this will be fine right"); // this is false hope
const board = document.getElementById("board");
for (let row = 0; row < 20; row += 1) {
  let y = document.createElement("tr");
  for (let col = 0; col < 10; col++) {
    let x = document.createElement("td");
    x.classList.add(`x${col}`);
    y.appendChild(x);
  }
  y.id = `y${row}`;
  console.log(y);
  console.log(board);
  board.appendChild(y);
}
const pieces = ["i", "o", "t", "s", "z", "j", "l"];
const pieceShapes = [
  [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
];
function generateBag() {
  let bag = [];
  for (let i = 0; i < 7; i++) {
    bag.push(pieces[i]);
  }
  return bag;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
const currentBag = [];
// const nextBag = []
function getNextPiece() {
  if (currentBag == 0) {
    currentBag = generateBag();
  }
  return currentBag.pop();
}
const generalOffsetData = [
  [
    // normal kick (1)
    [0, 0], // no rotation (0)
    [0, 0], // right rotation (1)
    [0, 0], // 180 rotation (2)
    [0, 0], // left rotation (3)
  ],
  [
    // kick 2
    [0, 0],
    [+1, 0],
    [0, 0],
    [-1, 0],
  ],
  [
    // you get it
    [0, 0],
    [+1, -1],
    [0, 0],
    [-1, 1],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 0],
    [0, 2],
  ],
  [
    [0, 0],
    [+1, -2],
    [0, 0],
    [-1, 2],
  ],
];
const iOffsetData = [
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, 1],
  ],
  [
    [-1, 0],
    [0, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [2, 0],
    [0, 0],
    [-2, 1],
    [0, 1],
  ],
  [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  [
    [2, 0],
    [0, -2],
    [-2, 0],
    [0, 2],
  ],
];
const oOffsetData = [
  [
    [0, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ],
  [], // o piece doesnt require any more rotation data
  [],
  [],
  [],
];

function rotate(piece, direction /*currentRotation, posx, posy*/) {
  let shape =
    pieceShapes[
      pieces.findIndex(function (p) {
        return p == piece;
      })
    ];
  if (piece == "i") {
    matrix = iOffsetData;
  } else if (piece == "o") {
    matrix = oOffsetData;
  } else {
    matrix = generalOffsetData;
  }

  if (direction == "r") {
    return shape[0].map((val, index) =>
      shape.map((row) => row[index]).reverse()
    );
  } else if (direction == "l") {
    return shape[0].map((val, index) =>
      shape.map((row) => row[row.length - 1 - index])
    );
  }
}
