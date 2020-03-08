function eliminateInlineStyle() {
  const body = document.body;
  const queue = [body];
  const allStyles = [];

  while (queue.length !== 0) {
    let node = queue.shift();
    queue.push(...Array.from(node.children));
    const styles = node.getAttribute("style");
    if (styles) {
      allStyles.push({ node, styles: styles.split(";") });
    }
  }

  const styleHTMLNode = document.createElement("style");

  for (let i = 0; i < allStyles.length; i++) {
    const style = allStyles[i];
    const className = `class${i}`;
    style.node.removeAttribute("style");
    style.node.setAttribute("class", className);
    const currentCSS = styleHTMLNode.innerText;
    styleHTMLNode.innerText = `${currentCSS} .${className}{${style.styles.join(
      ";"
    )}}`;
  }

  document.head.append(styleHTMLNode);
}
