export default class Route {
    constructor() {
        this._start = null;
        this._basesString = "";
        this._routeString = "";
        this._baseCounter = 0;
    }

    get basesString() {
        return this._basesString;
    }

    get routeString() {
        return this._routeString;
    }

    registerBase(base) {
        if (this._start === null) {
            this._start = base;
            this._start.next = this._start;
            this._start.previous = this._start;
            this._baseCounter++;
        } else if (this._start.next == this._start) {
            this._start.next = base;
            this._start.previous = base;
            base.next = this._start;
            base.previous = this._start;
            this._baseCounter++;
        } else {
            this._insertBeforeStart(base, this._start);
            this._baseCounter++;
        }
    }

    addBaseInPosition(base, position) {
        if (position <= (this._baseCounter + 1) && (position > 0)) {
            if (position == 1) {
                if (this._start === null) {
                    this.registerBase(base);
                } else {
                    this._insertBeforeStart(base, this._start);
                    this._start = this._start.previous;
                    this._baseCounter++;
                }
            } else {
                let previousProduct = this._searchForPreviousProduct(position - 1, this._start);
                console.log(previousProduct);
                base.next = previousProduct.next;
                base.previous = previousProduct;
                previousProduct.next.previous = base;
                previousProduct.next = base;
                this._baseCounter++;
            }
        } else {
            return false;
        }
    }

    _insertBeforeStart(base, prBase) {
        base.previous = prBase.previous;
        base.next = prBase;
        prBase.previous.next = base;
        prBase.previous = base;
    }

    _searchForPreviousProduct(position, start) {
        let i = 1;
        do {
            if (i == position) {
                return start;
            }
            start = start.next;
            i++;
        } while (start != this._start);
    }

    searchForInquiry(name) {
        if (this._start.name == name) {
            return this._start.toString();
        } else {
            let base = this._searchRegisteredBase(name, this._start.next);
            if (base == null) {
                return "Not found";
            } else {
                return base.toString();
            }
        }
    }

    deleteBase(name) {
        if (this._start.name == name) {
            if (this._start.next == this._start) {
                this._start = null;
                this._baseCounter--;
            } else if (this._start != null) {
                this._start.previous.next = this._start.next;
                this._start.next.previous = this._start.previous;
                this._start = this._start.next;
                this._baseCounter--;
            }
        } else {
            this._findBaseToDelete(name);
        }
    }

    _findBaseToDelete(name) {
        let base = this._searchRegisteredBase(name, this._start.next);
        if (base == null) {
            return;
        } else {
            base.next.previous = base.previous;
            base.previous.next = base.next;
            this._baseCounter--;
        }
    }

    //Send the next from this._start
    _searchRegisteredBase(name, start) {
        while (start != this._start) {
            if (start.name == name) {
                return start;
            }
            start = start.next;
        }
        return null;
    }

    executeRoute(name, sH, eH) {
        if (this._start != null) {
            let startBase = null;
            if (this._start.name == name) {
                startBase = this._start;
            } else {
                startBase = this._searchRegisteredBase(name, this._start.next);
            }

            if (startBase != null) {
                this._doRoute(startBase, sH, eH);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    _doRoute(base, sH, eH) {
        this._routeString = "";
        sH = this._convertToMiliseconds(sH);
        eH = this._convertToMiliseconds(eH);
        if (sH < eH) {
            this._routeString += `Current Time: ${this._convertToHourFormat(sH)}. Current Base: ${base.name}` + "<br>";
            base = base.next;
            do {
                let addMinutes = this._convertMinsToMiliseconds(base.mins);
                sH += addMinutes;
                this._routeString += `Current Time: ${this._convertToHourFormat(sH)}. Current Base: ${base.name}` + "<br>";
                base = base.next;
            } while (sH < eH);
        } else {
            let counter = 0,
                limitHour = this._convertToMiliseconds("23:59");

            this._routeString += `Current Time: ${this._convertToHourFormat(sH)}. Current Base: ${base.name}` + "<br>";
            base = base.next;
            do {
                let addMinutes = this._convertMinsToMiliseconds(base.mins);
                sH += addMinutes;
                if (sH > limitHour) {
                    sH -= (limitHour + 60000);
                    counter++;
                }
                this._routeString += `Current Time: ${this._convertToHourFormat(sH)}. Current Base: ${base.name}` + "<br>";
                base = base.next;
            } while ((sH < eH) || (counter == 0));
        }
    }

    _convertToMiliseconds(hour) {
        hour = hour.split(":");
        let hours = hour[0];
        let mins = hour[1];
        let milisecs = (hours * 3600000) + (mins * 60000);
        return milisecs;
    }

    _convertMinsToMiliseconds(mins) {
        let milisecs = mins * 60000;
        return milisecs;
    }

    _convertToHourFormat(milisecs) {
        let mins = parseInt((milisecs / (1000 * 60))) % 60;
        let hours = parseInt((milisecs / (1000 * 60 * 60))) % 24;
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (mins < 10) {
            mins = "0" + mins;
        }
        return hours + ":" + mins;
    }

    printBases() {
        this._basesString = "";
        console.log(this._baseCounter);
        if (this._start != null) {
            this._basesString += this._start.toString() + "<br>";
            this._getBasesAsString(this._start.next);
        }
    }

    _getBasesAsString(start) {
        if (start != this._start) {
            this._basesString += start.toString() + "<br>";
            this._getBasesAsString(start.next);
        }
    }
}