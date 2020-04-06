import {Element} from "./element";

let Index = 0;

function diff(oldTree, newTree) {
	let patches = {};
	walk(oldTree, newTree, Index++, patches);
	console.log(patches);
	return patches;
}

const ATTRS = "ATTRS";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
const TEXT = "TEXT";

function diffAttrs(oldProps, newProps) {
	let attrsDiff = {};
	for (let key in oldProps) {
		/*
		* 新旧两个节点，都有对应prop，或者旧的有该prop，新的没有该prop
		* */
		if (oldProps[key] !== newProps[key]) {
			attrsDiff[key] = newProps[key];
		}
	}
	for (let key in newProps) {
		/*
		* 新旧两个节点，旧的没有该prop，新的有该prop
		* */
		if (!oldProps.hasOwnProperty(key)) {
			attrsDiff[key] = newProps[key];
		}
	}
	return attrsDiff;
}
function walk(oldNode, newNode, index, patches) {
	let currentPatch = {};
	/*
	* 老的dom树有该节点，新的dom树没有该节点
	* */
	if (oldNode && !newNode) {
		currentPatch = {
			type: REMOVE,
			index
		};
	}
	/*
	* 如果新的dom树和老的dom树，均存在对应节点，且对应节点均为纯文本节点
	* */
	if (oldNode && newNode && !(oldNode instanceof Element) && !(newNode instanceof Element)) {
		if(oldNode !== newNode) {
			currentPatch = {
				type: TEXT,
				text: newNode
			};
		}
	}
	/*
	* 如果新的dom树和老的dom树，均存在对应节点，且对应节点均为元素节点
	* */
	if (oldNode && newNode && oldNode instanceof Element && newNode instanceof Element) {
		if (oldNode.type === newNode.type) {
			const attrs = diffAttrs(oldNode.props, newNode.props);
			if (Object.keys(attrs).length > 0) {
				currentPatch = {
					type: ATTRS,
					attrs
				};
			}
		} else {
			/*
			* 老节点和新节点type不同，直接替换为新节点
			* */
			currentPatch = {
				type: REPLACE,
				newNode
			};
		}
	}
	if (Object.keys(currentPatch).length > 0) {
		patches[index] = currentPatch;
	}
	if (oldNode.children && newNode.children && oldNode.children.length > 0 && newNode.children.length > 0) {
		const oldChildren = oldNode.children;
		const newChildren = newNode.children;
		oldChildren.forEach((oldChild, ix) => {
			walk(oldChild, newChildren[ix], Index++, patches);
		})
	}
}

export default diff;