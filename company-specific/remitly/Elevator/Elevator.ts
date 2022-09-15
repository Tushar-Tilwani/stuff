// Children of n => 2n , 2n+1
// parent of n => Math.floor(n/2);

type CallbackFn = (data: any) => void;
export class EventEmitter {
  // Write your code here.
  eventMap: Map<string, Set<CallbackFn>>;
  constructor() {
    this.eventMap = new Map();
  }

  addEventListener(name: string, callback: CallbackFn) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, new Set());
    }
    // Write your code here.
    this.eventMap.get(name).add(callback);
  }

  removeEventListener(name, callback) {
    // Write your code here.
    this.eventMap.get(name).delete(callback);
  }

  dispatchEvent(name: string, data: any) {
    // Write your code here.
    const callbackSet = this.eventMap.get(name);
    if (callbackSet === undefined) {
      return;
    }
    const callbacks = Array.from(callbackSet.values());
    for (const callback of callbacks) {
      callback(data);
    }
  }
}

//@ts-ignore
class Heap<T> {
  arr: T[];
  compartor: (a: T, b: T) => boolean;
  constructor(arr, compartor) {
    this.arr = [null];
    this.compartor = compartor;
    for (const val of arr) {
      this.push(val);
    }
  }
  push(val) {
    this.arr.push(val);
    this._bubbleUp(this.arr);
    return val;
  }
  peekTop() {
    return this.arr[1];
  }
  extractTop() {
    const len = this.arr.length - 1;
    if (len < 1) {
      return;
    }

    this.swap(this.arr, 1, len);

    const top = this.arr.pop();
    this._bubbleDown(this.arr);

    return top;
  }
  _bubbleUp(arr) {
    let childIndex = arr.length - 1;

    while (childIndex > 1) {
      let parentIndex = Math.floor(childIndex / 2);
      if (this.compartor(arr[parentIndex], arr[childIndex])) {
        this.swap(arr, childIndex, parentIndex);
        childIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  _bubbleDown(arr) {
    let parentIndex = 1;
    let endIndex = arr.length - 1;
    while (parentIndex <= endIndex) {
      let childIndex1 = 2 * parentIndex;
      let childIndex2 = 2 * parentIndex + 1;
      if (arr[childIndex1] === undefined && arr[childIndex2] === undefined) {
        // Leaf node
        return;
      } else if (arr[childIndex2] === undefined) {
        // Only left node is there
        if (this.compartor(arr[parentIndex], arr[childIndex1])) {
          this.swap(arr, parentIndex, childIndex1);
          parentIndex = childIndex1;
        } else {
          return;
        }
      } else {
        // Both right and left node are there
        let childIndex = this.compartor(arr[childIndex2], arr[childIndex1])
          ? childIndex1
          : childIndex2;

        if (this.compartor(arr[parentIndex], arr[childIndex])) {
          this.swap(arr, parentIndex, childIndex);
          parentIndex = childIndex;
        } else {
          return;
        }
      }
    }
  }
  size() {
    return this.arr.length - 1;
  }
  swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}

enum DIRECTION {
  UP = "UP",
  DOWN = "DOWN",
  IDLE = "IDLE",
}

//@ts-ignore
class ElevatorRequest {
  currentFloor: number;
  desiredFloor: number;
  constructor(currentFloor: number, desiredFloor: number) {
    this.currentFloor = currentFloor;
    this.desiredFloor = desiredFloor;
  }
}
//@ts-ignore
class Elevator {
  eventEmitter: EventEmitter;
  currentFloor: number;
  upQueue: Heap<ElevatorRequest>;
  downQeue: Heap<ElevatorRequest>;

  constructor(eventEmitter: EventEmitter) {
    this.upQueue = new Heap(
      [],
      (a: ElevatorRequest, b: ElevatorRequest) =>
        a.desiredFloor < b.desiredFloor
    );

    this.downQeue = new Heap(
      [],
      (a: ElevatorRequest, b: ElevatorRequest) =>
        a.desiredFloor > b.desiredFloor
    );

    this.currentFloor = 0;
    this.eventEmitter = eventEmitter;
  }

  add(request: ElevatorRequest) {
    if (request.currentFloor <= request.desiredFloor) {
      this.upQueue.push(request);
      return;
    }
    this.downQeue.push(request);
  }

  run() {
    this.eventEmitter.dispatchEvent("status", {
      currentFloor: this.currentFloor,
      direction: DIRECTION.IDLE,
    });

    while (this.upQueue.size() > 0) {
      const { desiredFloor } = this.upQueue.extractTop();
      console.log(`Elevator Stopped at ${desiredFloor} `);
      this.eventEmitter.dispatchEvent("status", {
        currentFloor: desiredFloor,
        direction: DIRECTION.UP,
      });
    }

    while (this.downQeue.size() > 0) {
      const { desiredFloor } = this.downQeue.extractTop();
      console.log(`Elevator Stopped at ${desiredFloor} `);
      this.eventEmitter.dispatchEvent("status", {
        currentFloor: desiredFloor,
        direction: DIRECTION.DOWN,
      });
    }

    this.eventEmitter.dispatchEvent("status", {
      currentFloor: this.currentFloor,
      direction: DIRECTION.IDLE,
    });
  }
}

const eventEmitter = new EventEmitter();
eventEmitter.addEventListener("status", ({ currentFloor, direction }) => {
  console.log(`Current Floor ${currentFloor} Direction ${direction}`);
});
//@ts-ignore
const elevator = new Elevator(eventEmitter);

elevator.add(new ElevatorRequest(0, 40));
elevator.add(new ElevatorRequest(10, 20));
elevator.add(new ElevatorRequest(30, 20));
elevator.add(new ElevatorRequest(35, 20));
elevator.add(new ElevatorRequest(5, 20));
elevator.add(new ElevatorRequest(3, 20));
elevator.add(new ElevatorRequest(6, 38));
elevator.add(new ElevatorRequest(37, 4));
elevator.add(new ElevatorRequest(0, 5));
elevator.run();
