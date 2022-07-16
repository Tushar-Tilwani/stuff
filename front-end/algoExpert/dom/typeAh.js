const BASE_URL = "https://www.algoexpert.io/api/fe/glossary-suggestions";
const typeahead = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const addFragment = (fragment, item) => {
  const li = document.createElement("li");
  li.textContent = item;
  fragment.appendChild(li);
  return fragment;
};

const addElement = async (str) => {
  const items = await fetchItems(str);
  removeAllChildNodes(suggestionsList);
  const fragment = items.reduce(addFragment, document.createDocumentFragment());
  suggestionsList.appendChild(fragment);
};

let timeoutId;
const handleTextChange = (e) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => addElement(e.target.value), 500);
};

const handleItemClick = (e) => {
  if (e.target.tagName.toUpperCase() !== "LI") {
    return;
  }
  const textContent = e.target.textContent;
  removeAllChildNodes(suggestionsList);
  typeahead.value = textContent;
};

const fetchItems = async (searchStr) => {
  const url = `${BASE_URL}?text=${searchStr}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }

  return [];
};

typeahead.addEventListener("input", handleTextChange);
suggestionsList.addEventListener("click", handleItemClick);
