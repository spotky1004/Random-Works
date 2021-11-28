import Item from "../Item.js";

class Belt extends Item {
  /** @param {(typeof Belt)["defaultExtras"]} extras */
  constructor(extras) {
    super({
      name: "Belt",
      description: "asdf",
    })
    this.extras = {
      isCurve: extras.isCurve ?? false,
      rotate: extras.rotate ?? 0,
      ...extras
    };
  }

  static defaultExtras = {
    isCurve: false,
    rotate: 0
  };

  /**
   * @param {{x: number, y: number}} tilePos 
   * @param {{x: number, y: number}} flotPos 
   * @returns {boolean}
   */
  static checkItemCollision(tilePos, flotPos, rotate, isCurve) {
    const collisionData = Belt.collisionDatas[+isCurve][+rotate%4];
    const offset = 0.1;

    if (
      tilePos.x+collisionData.x[0]*offset <= flotPos.x+0.5 &&
      tilePos.x+1-collisionData.x[1]*offset > flotPos.x+0.5 &&
      tilePos.y+collisionData.y[0]*offset <= flotPos.y+0.5 &&
      tilePos.y+1-collisionData.y[1]*offset > flotPos.y+0.5
    ) return true;
    return false;
  }

  /**
   * @param {{x: number, y: number}} position - Position of this item
   * @param {import("../index.js").Game} game - Game savedata
   * @param {import("../index.js").SessionData} sessionData 
   * @param {number} dt
   */
  doTick(position, game, sessionData, dt) {
    const rotate = this.extras.rotate;

    for (let i = 0; i < sessionData.floatingItems.length; i++) {
      const data = sessionData.floatingItems[i];
      const isCollision = Belt.checkItemCollision(position, data.position, this.extras.rotate, this.extras.isCurve);
      if (!isCollision) continue;
      if (this.extras.isCurve === false) {
        const direction = {
          x: ((rotate+1)%2)*((rotate%4/2)*2-1), // 0 -> -1, 2 -> 1
          y: (rotate%2)*(((rotate+1)%4/2)*-2+1) // 1 -> -1, 3 -> 1
        };
        data.position.x -= direction.x * dt / 1000;
        data.position.y -= direction.y * dt / 1000;
      } else {
        const curveData = Belt.curveDatas[this.extras.rotate];
        if (curveData.condition(data.position.x, data.position.y)) {
          data.position.x += curveData.direction[0].x * dt / 1000;
          data.position.y += curveData.direction[0].y * dt / 1000;
        } else {
          data.position.x += curveData.direction[1].x * dt / 1000;
          data.position.y += curveData.direction[1].y * dt / 1000;
        }
      }
    }
  }

  static collisionDatas = [
    [
      {
        x: [0, 0],
        y: [1, 1]
      },
      {
        x: [1, 1],
        y: [0, 0]
      },
      {
        x: [0, 0],
        y: [1, 1]
      },
      {
        x: [1, 1],
        y: [0, 0]
      },
    ],
    [
      {
        x: [0, 1],
        y: [1, 0]
      },
      {
        x: [0, 1],
        y: [0, 1]
      },
      {
        x: [1, 0],
        y: [0, 1]
      },
      {
        x: [1, 0],
        y: [1, 0]
      }
    ]
  ];

  static curveDatas = [
    {
      condition: (x, y) => (x+0.5)%1+(y+0.5)%1 < 1,
      direction: [{x: 1, y: 0}, {x: 0, y: 1}]
    },
    {
      condition: (x, y) => (1-(x+0.5)%1)+(y+0.5)%1 < 1,
      direction: [{x: 0, y: 1}, {x: -1, y: 0}]
    },
    {
      condition: (x, y) => (1-(x+0.5)%1)+(1-(y+0.5)%1) < 1,
      direction: [{x: -1, y: 0}, {x: 0, y: -1}]
    },
    {
      condition: (x, y) => (1-(x+0.5)%1)+(y+0.5)%1 < 1,
      direction: [{x: 1, y: 0}, {x: 0, y: -1}]
    }
  ]

  get itemImagePath() {
    return "./resources/" + this.name + "_" + (this.extras.isCurve ? "2" : "1") + ".png";
  }

  get elementStyles() {
    return {
      transform: `rotate(${this.extras.rotate * 90}deg)`
    }
  }
}

export default Belt;
