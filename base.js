export default class Base {
    constructor(base) {
        this._name = base.name;
        this._mins = base.min;
        this._next = null;
        this._previous = null;
    }

    get name() {
        return this._name;
    }

    get mins() {
        return this._mins;
    }

    get next() {
        return this._next;
    }

    set next(newNext) {
        this._next = newNext;
    }

    get previous() {
        return this._previous;
    }

    set previous(newPrevious) {
        this._previous = newPrevious;
    }

    toString() {
        return `Base '${this._name}'. Minutes to get there from last base: ${this._mins} minutes`
    }
}