import { size } from "lodash";

export const getKeyNamesArrayFromData = (data) => {
  let keyNamesArray = [];
  if (data && Array.isArray(data) && size(data) > 0) {
    data.map((obj) => {
      keyNamesArray = [...keyNamesArray, ...Object.keys(obj)];
    });
  }
  return [...new Set(keyNamesArray)];
};

export const getValuesArrayUsingKey = (data, key) => {
  let valuesArray = [];
  if (data && Array.isArray(data) && size(data) > 0) {
    valuesArray = data.map((obj) => obj[key]);
  }
  if (valuesArray && size(valuesArray) > 0) {
    valuesArray = valuesArray.filter(
      (item) => item !== null && item !== undefined
    );
  }
  return [...new Set(valuesArray)];
};

export const toCapitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getOptionListArray = (data, key) => {
  if (!data) return [];
  let valuesArray = getValuesArrayUsingKey(data, key);
  if (valuesArray && size(valuesArray) > 0) {
    return valuesArray.map((item) => ({
      label: item ? toCapitalize(item.toString()) : "",
      value: item ? item.toString() : "",
    }));
  }
};
