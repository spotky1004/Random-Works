import * as Items from "./Items/index.js";

const itemClasses = [
  Items.Tree,
  Items.Belt,
  Items.Extractor,
  Items.Wood
];

/**
 * @typedef CellData
 * @property {number} id - Id of item placed on the cell
 * @property {Objcet.<string, any>} extras - Extra data of the item
 */
/**
 * @typedef Game
 * @property {number} gridSize
 * @property {number} lastTick
 * @property {CellData[]} cellDatas
 */
/** @type {Game} */
let game = {
  gridSize: 5,
  lastTick: new Date().getTime(),
  cellDatas: []
};
/**
 * @typedef FloatingItemData
 * @property {keyof typeof Items} name - Name of the floating item
 * @property {import("./Item.js").default} instance
 * @property {{x: number, y: number}} position - Position of the floating item
 * @property {HTMLElement} ele - Element of the floating item
 * @property {boolean} onOverlay - A boolean that indicates element is on overlay
 * @property {boolean} deleted
 */
/**
 * @typedef SessionData
 * @property {(!import("./Item.js").default)[]} cellItems
 * @property {FloatingItemData[]} floatingItems
 */
/** @type {SessionData} */
let sessionData = {
  cellItems: [],
  floatingItems: []
};
const eles = {
  itemGridWarpper: document.getElementById("item-grid-warpper"),
  itemGridOverlay: document.getElementById("item-grid-overlay"),
  itemGrid: document.getElementById("item-grid"),
  /** @type {HTMLElement[]} */
  itemCells: []
};

function initGrid() {
  const tbody = eles.itemGrid.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  eles.itemCells = [];

  for (let y = 0; y < game.gridSize; y++) {
    const tr = document.createElement("tr");
    tr.classList.add("item-grid__row");
    tbody.appendChild(tr);
    for (let x = 0; x < game.gridSize; x++) {
      const td = document.createElement("td");
      td.classList.add("item-grid__cell");
      tr.appendChild(td);

      td.dataset.idx = x + y*game.gridSize;

      eles.itemCells.push(td);
      game.cellDatas.push(null);
      sessionData.cellItems.push(null);
    }
  }
}
function init() {
  initGrid();
}
init();

/**
 * @template {keyof typeof Items} T
 * @param {number} idx 
 * @param {T} name 
 * @param {Items[T]["defaultExtras"]} extras
 */
function setItem(idx, name, extras) {
  const itemInstance = new Items[name](extras);
  
  game.cellDatas[idx] = {
    id: itemClasses.findIndex(item => item.name === name),
    extras: itemInstance.extras
  };
  sessionData.cellItems[idx] = itemInstance;
}
/**
 * @param {number} idx1 
 * @param {number} idx2 
 */
function moveItem(idx1, idx2) {
  if (game.cellDatas[idx1] !== null) return;

  game.cellDatas[idx1] = game.cellDatas[idx2];
  sessionData.cellItems[idx1] = sessionData.cellItems[idx2];
  removeItem(idx2);
}
function removeItem(idx) {
  game.cellDatas[idx] = null;
  sessionData.cellItems[idx] = null;
  eles.itemCells[idx].style = "";
}

/** @type {!{ele: HTMLElement, idx: number}} */
let movingItem = null;
eles.itemGrid.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("item-grid__cell") && movingItem === null) {
    movingItem = {
      ele: e.target,
      idx: e.target.dataset.idx
    };
    movingItem.ele.classList.add("moving");
  }
});
document.addEventListener("mousemove", function(e) {
  if (movingItem !== null) {
    const clientPosition = {
      x: e.clientX,
      y: e.clientY
    };
    const positionOffset = {
      x: eles.itemGridWarpper.offsetLeft + movingItem.ele.offsetWidth/2,
      y: eles.itemGridWarpper.offsetTop + movingItem.ele.offsetHeight/2
    };
    const pos = {
      x: clientPosition.x - positionOffset.x,
      y: clientPosition.y - positionOffset.y
    };
  
    movingItem.ele.style.left = pos.x + "px";
    movingItem.ele.style.top = pos.y + "px";
  }
});
document.addEventListener("mouseup", function(e) {
  if (
    e.target.classList.contains("item-grid__cell") &&
    movingItem &&
    movingItem.idx !== e.target.dataset.idx
  ) {
    moveItem(e.target.dataset.idx, movingItem.idx);
  }

  if (movingItem) {
    movingItem && movingItem.ele.classList.remove("moving");
    movingItem.ele.style.top = "";
    movingItem.ele.style.left = "";
    movingItem = null;
  }
});
document.addEventListener("blur", function(_) {
  movingItem.ele.classList.remove("moving");
  movingItem.ele.style.top = "";
  movingItem.ele.style.left = "";
  movingItem = null;
});

function updateGrid(dt) {
  // Tick
  for (let i = 0; i < sessionData.cellItems.length; i++) {
    const itemInstance = sessionData.cellItems[i];
    if (itemInstance === null) continue;
    itemInstance.doTick(
      {x: i%game.gridSize, y: Math.floor(i/game.gridSize)},
      game,
      sessionData,
      dt
    );
  }

  // Overlay
  for (let i = 0; i < sessionData.floatingItems.length; i++) {
    const data = sessionData.floatingItems[i];
    if (!data.onOverlay) {
      eles.itemGridOverlay.appendChild(data.ele);
      data.ele.classList.add("floting-item");
      data.onOverlay = true;
      data.instance = new Items[data.name]();
    };

    const pos = {
      x: eles.itemGridWarpper.offsetWidth / game.gridSize * (data.position.x + 0.5),
      y: eles.itemGridWarpper.offsetHeight / game.gridSize * (data.position.y + 0.5)
    };

    data.ele.style.left = pos.x + "px";
    data.ele.style.top = pos.y + "px";
    data.ele.style.backgroundImage = `url(${data.instance.itemImagePath})`;
  }

  // Cell
  for (let i = 0; i < game.cellDatas.length; i++) {
    const itemCellEle = eles.itemCells[i];
    const itemInstance = sessionData.cellItems[i];
    const itemData = game.cellDatas[i];
    if (itemData === null) continue;

    itemCellEle.style.backgroundImage = `url(${itemInstance.itemImagePath})`;

    const elementStyles = itemInstance.elementStyles;
    for (const prop in elementStyles) {
      itemCellEle.style[prop] = elementStyles[prop];
    }
  }
}
function tick() {
  const timeNow = new Date().getTime();
  const dt = Math.min(60, timeNow - game.lastTick);
  game.lastTick = timeNow;
  updateGrid(dt);

  requestAnimationFrame(tick);
}
tick();

setItem(0, "Tree", {age: 10});
setItem(1, "Extractor", {});
setItem(2, "Belt", {isCurve: false});
setItem(3, "Belt", {isCurve: true});
setItem(8, "Belt", {isCurve: false, rotate: 1});

setItem(15, "Tree", {age: 10});
setItem(16, "Belt", {rotate: 0});
setItem(17, "Belt", {rotate: 1});
setItem(18, "Belt", {rotate: 2});
setItem(19, "Belt", {rotate: 3});
setItem(20, "Extractor", {});
setItem(21, "Belt", {rotate: 0, isCurve: true});
setItem(22, "Belt", {rotate: 1, isCurve: true});
setItem(23, "Belt", {rotate: 2, isCurve: true});
setItem(24, "Belt", {rotate: 3, isCurve: true});
