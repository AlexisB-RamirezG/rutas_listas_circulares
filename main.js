import Route from "./route.js";
import Base from "./base.js";

let bttnRegister = document.querySelector("#register"),
    bttnInquiry = document.querySelector("#inquiry"),
    bttnInsert = document.querySelector("#insert"),
    bttnDelete = document.querySelector("#delete"),
    bttnStart = document.querySelector("#start"),
    divBases = document.querySelector("#showBases"),
    divRoute = document.querySelector("#showRoute"),
    divInquiry = document.querySelector("#showInquiry"),
    divStatus = document.querySelector("#status");

bttnRegister.addEventListener("click", () => {
    m.registerBaseIntoRoute();
});

bttnInquiry.addEventListener("click", () => {
    m.makeInquiry(document.querySelector("#inquiryName").value);
});

bttnInsert.addEventListener("click", () => {
    let position = document.querySelector("#position").value;
    m.insertBase(position);
});

bttnDelete.addEventListener("click", () => {
    m.deleteFromInventory(document.querySelector("#deleteName").value);
});

bttnStart.addEventListener("click", () => {
    m.startRoute(document.querySelector("#startBase").value, document.querySelector("#startHour").value, document.querySelector("#finishHour").value);
});

class Main {
    constructor() {
        this._baseRoute = new Route();
    }

    registerBaseIntoRoute() {
        divStatus.innerHTML = "";
        let objNewBase = this._extractDataFromInputs();
        this._baseRoute.registerBase(objNewBase);
        this._showBases();
    }

    insertBase(position) {
        divStatus.innerHTML = "";
        let insertValidation = this._baseRoute.addBaseInPosition(this._extractDataFromInputs(), position);
        if (insertValidation == false) {
            divStatus.innerHTML = "Input a valid position or base to insert";
        } else {
            this._showBases();
        }
    }

    makeInquiry(name) {
        divInquiry.innerHTML = this._baseRoute.searchForInquiry(name);
    }

    deleteFromInventory(name) {
        divStatus.innerHTML = "";
        this._baseRoute.deleteBase(name);
        this._showBases();
    }

    startRoute(name, sHour, eHour) {
        divRoute.innerHTML = "";
        if(this._baseRoute.executeRoute(name, sHour, eHour) == false) {
            divRoute.innerHTML = "Base not found";
        } else {
            this._showRoute();
        }
    }

    _extractDataFromInputs() {
        let newBase = {
            name: document.querySelector("#name").value,
            min: Number(document.querySelector("#minutes").value)
        }
        let objNewBase = new Base(newBase);
        return objNewBase;
    }

    _showBases() {
        this._baseRoute.printBases();
        divBases.innerHTML = this._baseRoute.basesString;
    }

    _showRoute() {
        divRoute.innerHTML = this._baseRoute.routeString;
    }
}

let m = new Main();