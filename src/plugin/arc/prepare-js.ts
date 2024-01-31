export interface IOptions {
  
}

export const prepareJs = (sourceObject, _options: IOptions = {}, level = 0, tabSize = '  ', result = '') => {

  Object.keys(sourceObject).map((objKey) => {
    if (typeof sourceObject[objKey] === 'object') {
      result += `${tabSize.repeat(level)} ${objKey}: {\n`;
      result += prepareJs(sourceObject[objKey], {}, level + 1);
      result += `${tabSize.repeat(level)}},\n`
    } else {
      result += `${tabSize.repeat(level )} ${objKey}: ${sourceObject[objKey]},\n`;
    }
  });

  return result;

}