interface IParams {
  origin: Record<string, any>;
  level?: number;
  result?: string;
  tabSize?: string;
}

type ValueType = 'string' | 'object';

interface IRow {
  name: string;
  valueType: ValueType;
  value?: string;
}

export const normalizeVariables = ({ origin, result = '', tabSize = '  ', level = 0 }: IParams) => {
  Object.keys(origin).map((objKey) => {
    if (typeof origin[objKey] === 'object') {
      result += `${tabSize.repeat(level)} ${objKey}: {\n`;
      result += normalizeVariables({
        origin: origin[objKey],
        level: level + 1
      });
      result += `${tabSize.repeat(level)}},\n`
    } else {
      result += `${tabSize.repeat(level + 1)} ${objKey}: ${origin[objKey]},\n`;
    }
  });

  return result;
}