import { validateJSVariable } from '../helpers/validate-js-variable';
import { findPropertiesWithSameValues } from "../helpers/find-properties-with-same-values";

export const checkUniq = (obj: Record<string, any>, errors = []) => {
  if (typeof obj === 'object') {
    let keys = Object.keys(obj);

    let currentPropsMap = {};
    keys.map((rootKey) => {
      currentPropsMap[rootKey] = validateJSVariable(rootKey, {mode: 'cut'});
      return ({ [rootKey]: validateJSVariable(rootKey, {mode: 'cut'}) })
    });
    let errs = findPropertiesWithSameValues(currentPropsMap);
    if (errs.length) {
      errors.push(errs);
    }

    keys.map(key => checkUniq(obj[key], errors));
  }

  return errors;
}
