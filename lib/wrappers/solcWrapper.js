import fse from 'fs-extra';
import fs from 'fs';
import {execSync} from 'child_process';
import {readFileContent} from '../utils';
import ImportMappingBuilder from './importMappingBuilder';

class SolcWrapper {
  constructor(config) {
    this.config = config;
  }

  createTemporaryFolderPath() {
    this.tmpPath = `./${fs.mkdtempSync('waffle-tmp')}`;
    return this.tmpPath;
  }

  getTemporaryOutputFilePath() {
    return `${this.tmpPath}/combined.json`;
  }

  removeTemporaryDirectory() {
    fse.removeSync(this.tmpPath);
  }

  getMappings(sources) {
    const mappings = new ImportMappingBuilder(this.config.sourcesPath, this.config.npmPath).getMappings(sources);
    return Object.entries(mappings)
      .map(([key, value]) => `${key}=${value}`)
      .join(' ');
  }

  buildCommand(sources, outputDirectory) {
    const command = 'solc';
    const params = '--combined-json abi,asm,ast,bin,bin-runtime,clone-bin,compact-format,devdoc,hashes,interface,metadata,opcodes,srcmap,srcmap-runtime,userdoc';
    const srcFile = sources.join(' ');
    const importMappings = this.getMappings(sources);
    return `${command} ${params} ${srcFile} ${importMappings} -o ${outputDirectory}`;
  }

  compile(sources) {
    const outputDirectory = this.createTemporaryFolderPath();
    execSync(this.buildCommand(sources, outputDirectory));
    const result = readFileContent(this.getTemporaryOutputFilePath());
    this.removeTemporaryDirectory();
    return JSON.parse(result);
  }
}

export default SolcWrapper;
