function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addOrRemoveClass(targetElement, condition, className) {
  if (condition === "remove") {
    if (targetElement.classList.contains(className)) {
      targetElement.classList.remove(className);
    }
  } else if (condition === "add") {
    if (!targetElement.classList.contains(className)) {
      targetElement.classList.add(className);
    }
  }
}

function setScrollPosition(target, position) {
  target.scrollTop = position;
}

export { uppercaseFirstLetter, addOrRemoveClass, setScrollPosition };
