import {isFile, falttenObjectArray, readFileContent} from '../utils';
import {join, sep, resolve, dirname} from 'path';

const PATH = `\\"(?<path>([^"\\r\\n\\\\]|'\\\\'.)*)\\"`;
const TYPE = `(?<type>[a-zA-Z][a-zA-Z0-9]*)`;
const AS = `(?<as>[a-zA-Z][a-zA-Z0-9]*)`;
const IMPORT_TYPE_A = new RegExp(`import\\s+${PATH}\\s*(as\\s+${AS})?\\s*;`);
const IMPORT_TYPE_B = new RegExp(`import\\s+(\\*|${TYPE})\\s+(as\\s+${AS})?\\s*from\\s+${PATH};`);
const IMPORT_TYPE_C = new RegExp(`import\\s+\\{(?<aliasList>.*)\\}\\s*from\\s+${PATH};`);

class ImportMappingBuilder {
  constructor(contractBasePath, npmPath) {
    this.contractBasePath = contractBasePath;
    this.npmPath = npmPath;
  }

  getMapping(importPath) {
    const joinedPath = join(this.contractBasePath, importPath);
    if (isFile(joinedPath)) {
      return {};
    }
    const npmPath = join(this.npmPath, importPath);
    if (isFile(npmPath)) {
      const [prefix] = importPath.split(sep);
      return {[prefix]: dirname(resolve(npmPath))};
    }
    throw TypeError(`Invalid import, file does not exist: ${importPath}`);
  }

  getMappingForImport(importDirective, importRegExp) {
    const {path} = importRegExp.exec(importDirective).groups;
    return this.getMapping(path);
  }

  getMappingForUnitWithRegexp(unit, regexp) {
    const regexpWithGlobal = new RegExp(regexp, 'g');
    const reducer = (accum, importDirective) =>
      Object.assign(accum, this.getMappingForImport(importDirective, regexp));
    const mappings = unit.match(regexpWithGlobal) || [];
    return mappings.reduce(reducer, {});
  }

  getMappingForUnit(unit) {
    return falttenObjectArray([
      this.getMappingForUnitWithRegexp(unit, IMPORT_TYPE_A),
      this.getMappingForUnitWithRegexp(unit, IMPORT_TYPE_B),
      this.getMappingForUnitWithRegexp(unit, IMPORT_TYPE_C)
    ]);
  }

  getMappings(sources) {
    return falttenObjectArray(
      sources.map((path) =>
        this.getMappingForUnit(readFileContent(path))
      ));
  }
}

export default ImportMappingBuilder;
export {IMPORT_TYPE_A, IMPORT_TYPE_B, IMPORT_TYPE_C};
