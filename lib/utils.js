import fs from 'fs';

export const readFileContent = (path) =>
  fs.readFileSync(path).toString();

export const isPositiveIntegerString = (string) =>
  /^\d+$/.test(string);

export const eventParseResultToArray = (eventResult) =>
  Object.keys(eventResult)
    .filter(isPositiveIntegerString)
    .map((key) => eventResult[key]);

export const isWarningMessage = (error) =>
  /: Warning: /.test(error);

export const isDirectory = (filePath) =>
  fs.existsSync(filePath) && fs.statSync(filePath).isDirectory(filePath);

export const isFile = (filePath) =>
  fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

export const falttenObjectArray = (array) =>
  array.reduce((accum, object) => Object.assign(accum, object), {});


