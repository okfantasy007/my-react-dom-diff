function Element(type, props, children) {
	this.type = type;
	this.props = props;
	this.children = children;
}

function createElement(type, props, children) {
	return new Element(type, props, children);
}

function setAttr(node, type, key, value) {
	switch (key) {
		case "value":
			const lowerType = type.toLowerCase();
			if (lowerType === "input" || lowerType === "textarea") {
				node.value = value;
			} else {
				node.setAttribute(key, value);
			}
			break;
		case "style":
			node.style.cssText = value;
			break;
		default:
			node.setAttribute(key, value);
			break;
	}
}

/*
* 传入vDomObj
* 返回node节点
* */
function render(vDomObj) {
	const node = document.createElement(vDomObj.type);
	const props = vDomObj.props;
	for (let key in props) {
		setAttr(node, vDomObj.type, key, props[key]);
	}
	if (vDomObj.children && vDomObj.children.length > 0) {
		const children = vDomObj.children;
		children.forEach((child) => {
			if (child instanceof Element) {
				node.appendChild(render(child));
			} else {
				node.appendChild(document.createTextNode(child));
			}
		})
	}
	return node;
}

export {Element, createElement, setAttr, render};
