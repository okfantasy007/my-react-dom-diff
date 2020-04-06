// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import {createElement, render} from "./element";
import diff from "./diff";
import patch from "./patch";

/*ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	document.getElementById('root')
);*/

const vDomObj = createElement(
	"ul",
	{class: "list"},
	[
		createElement("li", {class: "item"}, ["a"]),
		createElement("li", {class: "item"}, ["b"]),
		createElement("li", {class: "item"}, ["c"]),
	]);

const vDomObj2 = createElement(
	"ul",
	{class: "list-group"},
	[
		createElement("li", {class: "item"}, ["1"]),
		createElement("div", {class: "item"}, ["b"]),
		createElement("li", {class: "item-new", style: "background: gray"}, ["3"]),
	]);

const ele = render(vDomObj);
console.log(ele);
document.getElementById("root").appendChild(ele);
const patches = diff(vDomObj, vDomObj2);
const newEle = patch(ele, patches);
console.log(newEle);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
