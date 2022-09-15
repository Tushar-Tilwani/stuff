"use strict";
// Children of n => 2n , 2n+1
// parent of n => Math.floor(n/2);
exports.__esModule = true;
exports.EventEmitter = void 0;
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.eventMap = new Map();
    }
    EventEmitter.prototype.addEventListener = function (name, callback) {
        if (!this.eventMap.has(name)) {
            this.eventMap.set(name, new Set());
        }
        // Write your code here.
        this.eventMap.get(name).add(callback);
    };
    EventEmitter.prototype.removeEventListener = function (name, callback) {
        // Write your code here.
        this.eventMap.get(name)["delete"](callback);
    };
    EventEmitter.prototype.dispatchEvent = function (name, data) {
        // Write your code here.
        var callbackSet = this.eventMap.get(name);
        if (callbackSet === undefined) {
            return;
        }
        var callbacks = Array.from(callbackSet.values());
        for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
            var callback = callbacks_1[_i];
            callback(data);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//@ts-ignore
var Heap = /** @class */ (function () {
    function Heap(arr, compartor) {
        this.arr = [null];
        this.compartor = compartor;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var val = arr_1[_i];
            this.push(val);
        }
    }
    Heap.prototype.push = function (val) {
        this.arr.push(val);
        this._bubbleUp(this.arr);
        return val;
    };
    Heap.prototype.peekTop = function () {
        return this.arr[1];
    };
    Heap.prototype.extractTop = function () {
        var len = this.arr.length - 1;
        if (len < 1) {
            return;
        }
        this.swap(this.arr, 1, len);
        var top = this.arr.pop();
        this._bubbleDown(this.arr);
        return top;
    };
    Heap.prototype._bubbleUp = function (arr) {
        var childIndex = arr.length - 1;
        while (childIndex > 1) {
            var parentIndex = Math.floor(childIndex / 2);
            if (this.compartor(arr[parentIndex], arr[childIndex])) {
                this.swap(arr, childIndex, parentIndex);
                childIndex = parentIndex;
            }
            else {
                break;
            }
        }
    };
    Heap.prototype._bubbleDown = function (arr) {
        var parentIndex = 1;
        var endIndex = arr.length - 1;
        while (parentIndex <= endIndex) {
            var childIndex1 = 2 * parentIndex;
            var childIndex2 = 2 * parentIndex + 1;
            if (arr[childIndex1] === undefined && arr[childIndex2] === undefined) {
                // Leaf node
                return;
            }
            else if (arr[childIndex2] === undefined) {
                // Only left node is there
                if (this.compartor(arr[parentIndex], arr[childIndex1])) {
                    this.swap(arr, parentIndex, childIndex1);
                    parentIndex = childIndex1;
                }
                else {
                    return;
                }
            }
            else {
                // Both right and left node are there
                var childIndex = this.compartor(arr[childIndex2], arr[childIndex1])
                    ? childIndex1
                    : childIndex2;
                if (this.compartor(arr[parentIndex], arr[childIndex])) {
                    this.swap(arr, parentIndex, childIndex);
                    parentIndex = childIndex;
                }
                else {
                    return;
                }
            }
        }
    };
    Heap.prototype.size = function () {
        return this.arr.length - 1;
    };
    Heap.prototype.swap = function (a, i, j) {
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    };
    return Heap;
}());
var DIRECTION;
(function (DIRECTION) {
    DIRECTION["UP"] = "UP";
    DIRECTION["DOWN"] = "DOWN";
    DIRECTION["IDLE"] = "IDLE";
})(DIRECTION || (DIRECTION = {}));
//@ts-ignore
var ElevatorRequest = /** @class */ (function () {
    function ElevatorRequest(currentFloor, desiredFloor) {
        this.currentFloor = currentFloor;
        this.desiredFloor = desiredFloor;
    }
    return ElevatorRequest;
}());
//@ts-ignore
var Elevator = /** @class */ (function () {
    function Elevator(eventEmitter) {
        this.upQueue = new Heap([], function (a, b) {
            return a.desiredFloor < b.desiredFloor;
        });
        this.downQeue = new Heap([], function (a, b) {
            return a.desiredFloor > b.desiredFloor;
        });
        this.currentFloor = 0;
        this.eventEmitter = eventEmitter;
    }
    Elevator.prototype.add = function (request) {
        if (request.currentFloor <= request.desiredFloor) {
            this.upQueue.push(request);
            return;
        }
        this.downQeue.push(request);
    };
    Elevator.prototype.run = function () {
        this.eventEmitter.dispatchEvent("status", {
            currentFloor: this.currentFloor,
            direction: DIRECTION.IDLE
        });
        while (this.upQueue.size() > 0) {
            var desiredFloor = this.upQueue.extractTop().desiredFloor;
            console.log("Elevator Stopped at ".concat(desiredFloor, " "));
            this.eventEmitter.dispatchEvent("status", {
                currentFloor: desiredFloor,
                direction: DIRECTION.UP
            });
        }
        while (this.downQeue.size() > 0) {
            var desiredFloor = this.downQeue.extractTop().desiredFloor;
            console.log("Elevator Stopped at ".concat(desiredFloor, " "));
            this.eventEmitter.dispatchEvent("status", {
                currentFloor: desiredFloor,
                direction: DIRECTION.DOWN
            });
        }
        this.eventEmitter.dispatchEvent("status", {
            currentFloor: this.currentFloor,
            direction: DIRECTION.IDLE
        });
    };
    return Elevator;
}());
var eventEmitter = new EventEmitter();
eventEmitter.addEventListener("status", function (_a) {
    var currentFloor = _a.currentFloor, direction = _a.direction;
    console.log("Current Floor ".concat(currentFloor, " Direction ").concat(direction));
});
//@ts-ignore
var elevator = new Elevator(eventEmitter);
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
