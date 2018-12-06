import solc from 'solc';
import {readFileContent} from '../utils';

class SolcjsWrapper {
  async findInputs(files) {
    return Object.assign(...files.map((file) => ({[file]: readFileContent(file)})));
  }

  async compile(sourcesFiles, findImports) {
    const sources = await this.findInputs(sourcesFiles);
    return solc.compile({sources}, 1, findImports);
  }
}

export default SolcjsWrapper;
