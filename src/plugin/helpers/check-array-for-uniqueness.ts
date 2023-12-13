import { validateJSVariable } from './validate-js-variable';

export function isUniqueValue(value, array) {
  if (!array.includes(value)) {
    throw new Error("This value doesn't exist in the array");
  }
  return array.indexOf(value) === array.lastIndexOf(value);
}

// function for Array.every()
export function isUnique(value, index, array) {
  index;
  return array.indexOf(value) === array.lastIndexOf(value);
}

export function checkArrayValuesForUniqueness(array: string[]) {
  if (!(array.map((el) => validateJSVariable( el, { mode: 'cut'})).every(isUnique))) {
    return false;
  }
  return true;
}