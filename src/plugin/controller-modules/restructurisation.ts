interface IParams {
  origin: Record<string, any>;
  level?: number;
  result?: IRow[];
}

type ValueType = 'string' | 'object' | 'close';

export interface IRow {
  valueType: ValueType;
  level: number;
  name?: string;
  value?: string;
}

export const restructurisation = ({ origin, result = [], level = 0 }: IParams) => {
  Object.keys(origin).map((objKey) => {
    if (typeof origin[objKey] === 'object') {
      result.push({
        name: objKey,
        valueType: 'object',
        level: level,
      });
      result.push(...restructurisation({
        origin: origin[objKey],
        level: level + 1
      }));

      result.push({
        valueType: 'close',
        level: level
      });
    } else {
      result.push({
        valueType: 'string',
        level: level,
        name: objKey,
        value: origin[objKey],
      })
    }
  });

  return result;
}