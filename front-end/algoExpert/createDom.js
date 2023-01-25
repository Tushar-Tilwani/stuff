function createDom(root) {
  if (Object.prototype.toString.call(root) === "[object String]") {
    return document.createTextNode(root);
  }

  const node = document.createElement(root.type);
  const attributes = Object.keys(root.attributes ?? {});
  for (const attribute of attributes) {
    node.setAttribute(attribute, root.attributes[attribute]);
  }
  const children = Array.from(root.children ?? []);
  for (const child of children) {
    node.appendChild(createDom(child));
  }
  return node;
}

// Do not edit the line below.
exports.createDom = createDom;
