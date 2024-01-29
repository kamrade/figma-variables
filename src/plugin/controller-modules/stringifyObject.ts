export const stringifyObject = (obj, level = 0, tabSize = '  ', result = '') => {
  Object.keys(obj).map((objKey) => {
    if (typeof obj[objKey] === 'object') {
      result += `${tabSize.repeat(level)} ${objKey}: {\n`;
      result += stringifyObject(obj[objKey], level + 1);
      result += `${tabSize.repeat(level)}},\n`
    } else {
      result += `${tabSize.repeat(level + 1)} ${objKey}: ${obj[objKey]},\n`;
    }

  });

  return result;

}