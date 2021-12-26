const field = document.getElementById("field");
class FieldItem {
  /**
   * @param {number} idx
   * @param {string} emoji 
   * @param {boolean} isAnswer 
   */
  constructor(idx, emoji, isAnswer) {
    /** @type {number} */
    this.idx = idx;
    /** @type {boolean} */
    this.isAnswer = isAnswer;
    /** @type {{ x: number, y: number }} */
    this.position = { x: Math.random()*0.8+0.05, y: Math.random()*0.8+0.05 };
    /** @type {number} */
    this.rotate = Math.random() * 360;
    /** @type {number} */
    this.scale = 1.6+Math.random()*0.8;
    /** @type {boolean} */
    this.isFound = false;

    const ele = document.createElement("div");
    ele.classList.add("field__item");
    ele.innerText = emoji;
    ele.dataset.idx = this.idx;
    field.appendChild(ele);
    /** @type {HTMLDivElement} */
    this.ele = ele;
    
    this.updateElement();
  }

  relocate() {
    if (this.isFound) return;

    this.position = { x: Math.random()*0.8+0.05, y: Math.random()*0.8+0.05 };
    this.ele.style.zIndex = Math.floor(Math.random() * 1000);
    this.updateElement();
  }
  
  updateElement() {
    this.ele.style.left = (this.position.x*100) + "vmin";
    this.ele.style.top = (this.position.y*100) + "vmin";
    this.ele.style.transform = `rotate(${this.rotate}deg) scale(${this.scale})`;
  }

  /**
   * @param {{ x: number, y: number }} from 
   */
  blow(from) {
    if (this.isFound) return;

    const dist = Math.sqrt((this.position.x - from.x)**2 + (this.position.y - from.y)**2);
    const power = Math.sqrt(Math.max(0, 0.1-dist));
    const deg = (Math.atan2(this.position.y - from.y, this.position.x - from.x)+Math.PI*3/2+Math.random()/4)%(Math.PI*2);

    this.position.x -= Math.sin(deg)*power/30;
    this.position.x = Math.max(0.05, Math.min(0.95, this.position.x));

    this.position.y -= -Math.cos(deg)*power/10;
    this.position.y = Math.max(0.05, Math.min(0.95, this.position.y));

    this.updateElement();
  }

  answerCheck() {
    if (this.isAnswer) {
      this.isFound = true;
      canUseSpace = true;
      this.ele.classList.add("found");
      found++;
      if (found === FOUR_LEAF_CLOVER_COUNT) {
        alert("Congratulations, you found all 🍀!\nThanks for playing game!");
      }
    }
  }
}

const FOUR_LEAF_CLOVER_COUNT = 10;
let found = 0;
/** @type {FieldItem[]} */
let fieldItems = [];
for (let i = 0; i < FOUR_LEAF_CLOVER_COUNT*100; i++) {
  const isClover = i%100 === 0;
  fieldItems.push(new FieldItem(i, isClover ? "🍀" : "☘️", isClover));
}

let isHolding = false;
document.addEventListener("mousedown", () => isHolding = true);
document.addEventListener("mouseup", () => isHolding = false);
document.addEventListener("blur", () => isHolding = false);
let canUseSpace = true;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (canUseSpace) {
      canUseSpace = false;
      for (let i = 0; i < fieldItems.length; i++) {
        fieldItems[i].relocate();
      }
    }
  }
})
field.addEventListener("mousemove", (e) => {
  if (!isHolding) return;

  const position = {
    x: (e.clientX - field.offsetLeft) / field.offsetWidth,
    y: (e.clientY - field.offsetTop) / field.offsetHeight
  };

  for (let i = 0; i < fieldItems.length; i++) {
    fieldItems[i].blow(position);
  }
});
field.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.classList.contains("field__item")) {
    if (fieldItems[target.dataset.idx].isAnswer) {
      fieldItems[target.dataset.idx].answerCheck();
    }
  }
})
