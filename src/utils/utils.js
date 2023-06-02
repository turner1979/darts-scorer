const elementCount = (array, element) => {
  return array.reduce(
    (currentElement, arrElement) =>
      arrElement == element ? currentElement + 1 : currentElement,
    0
  );
};

export {
  elementCount
}
