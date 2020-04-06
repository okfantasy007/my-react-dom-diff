import {Element, setAttr, render} from "./element";

const ATTRS = "ATTRS";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
const TEXT = "TEXT";

let overAllPatches;
let Index = 0;

function patch(node, patches) {
	overAllPatches = patches;
	walk(node);
}

function walk(node) {
	// 先取出对应节点的patch
	const currentPatch = overAllPatches[Index++];// 这行代码为什么要放在for循环前面？
	// 深度优先遍历
	node.childNodes.forEach((child) => {
		walk(child);
	});
	// 如果对应节点有补丁，则给对应节点打补丁
	if (currentPatch) {
		doPatch(node, currentPatch);
	}
}

function doPatch(node, currentPatch) {
	switch (currentPatch.type) {
		case ATTRS:
			if (node.tagName) {
				const tagName = node.tagName.toLowerCase();
				for (let key in currentPatch.attrs) {
					const value = currentPatch.attrs[key];
					if (value) {
						setAttr(node, tagName, key, value);
					} else {
						node.removeAttribute(key);
					}
				}
			}
			break;
		case REMOVE:
			node.parentNode.removeChild(node);
			break;
		case REPLACE:
			let newNode = (currentPatch.newNode instanceof Element) ? render(currentPatch.newNode)
				: document.createTextNode(currentPatch.newNode);
			node.parentNode.replaceChild(newNode, node);
			break;
		case TEXT:
			node.textContent = currentPatch.text;
			break;
		default:
			break;
	}

}

export default patch;