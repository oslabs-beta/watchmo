"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDom = __importStar(require("react-dom"));
var App_1 = require("./Components/App");
var ProjectContext_1 = require("./Components/Context/ProjectContext");
ReactDom.render(React.createElement(ProjectContext_1.ProjectProvider, null,
    React.createElement(App_1.App, null)), document.getElementById('root'));
