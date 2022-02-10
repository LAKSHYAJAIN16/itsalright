//Imports
import MUITest from "./app/ui.test";
import UITest from "./web/ui.test";
import APITest from "./web/api.test";
import WebRTCTest from "./server/webRTC.test";

//Test Instances
const mui = new MUITest();
const ui = new UITest();
const api = new APITest();
const webRTC = new WebRTCTest();
const tests = [mui, ui, api, webRTC];

tests.map((obj)=> {
    obj.test();
})