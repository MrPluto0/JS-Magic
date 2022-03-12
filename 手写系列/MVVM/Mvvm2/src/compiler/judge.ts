export function isElementNode(node: Node) {
  return node.nodeType === node.ELEMENT_NODE;
}

export function isTextNode(node: Node) {
  return node.nodeType === node.TEXT_NODE;
}

export function isDirective(attr: string) {
  return attr.indexOf("v-") === 0;
}

export function isEventAttr(attr: string) {
  return attr.indexOf("@") === 0;
}

export function isBindAttr(attr: string) {
  return attr.indexOf(":") === 0;
}

export function isSlotAttr(attr: string) {
  return attr.indexOf("#") === 0;
}
