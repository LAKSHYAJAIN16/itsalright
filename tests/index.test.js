//Imports
import MUITest from "./app/ui.test";
import UITest from "./web/ui.test";
import APITest from "./web/api.test";

//Test Instances
const mui = new MUITest();
const ui = new UITest();
const api = new APITest();
const tests = [mui, ui, api];

tests.map((obj)=> {
    obj.test();
})