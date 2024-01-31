export const findPropertiesWithSameValues = (obj: Record<string, any>) => {
  let result: string[] = [];
  const uniqueValues = Object.values(obj);
  uniqueValues.forEach((value: string) => {
    let res = Object.keys(obj).filter(key => obj[key] === value);
    if (res.length >= 2) {
      result.push(res[0]);
    }
  });
  return result;
}
