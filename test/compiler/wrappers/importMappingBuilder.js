import chai, {expect} from 'chai';
import ImportsMappingBuilder, {IMPORT_TYPE_A, IMPORT_TYPE_B, IMPORT_TYPE_C} from '../../../lib/wrappers/importMappingBuilder';

chai.use(require('chai-string'));


describe('ImportsMappingBuilder', () => {
  let builder;
  let expectedPath;

  before(() => {
    builder = new ImportsMappingBuilder('./test/compiler/custom/custom_contracts', './test/compiler/custom/custom_node_modules');
    expectedPath = `${process.cwd()}/test/compiler/custom/custom_node_modules/openzeppelin-solidity`;
  });

  describe('convertPath', () => {
    it('no mapping for local file', async () => {
      expect(builder.getMapping('Custom.sol')).to.deep.eq({});
    });

    it('generates mapping for npm import', async () => {
      const mapping = builder.getMapping('openzeppelin-solidity/CustomSafeMath.sol');
      expect(mapping).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for import directive type A (no transformation)', async () => {
      const input = 'import "Custom.sol";';
      expect(builder.getMappingForImport(input, IMPORT_TYPE_A)).to.deep.eq({});
    });

    it('generates mapping for import directive type A', async () => {
      const input = 'import "openzeppelin-solidity/CustomSafeMath.sol";';
      expect(builder.getMappingForImport(input, IMPORT_TYPE_A)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for import directive type A with as', async () => {
      const input = 'import "openzeppelin-solidity/CustomSafeMath.sol" as SomeName;';
      expect(builder.getMappingForImport(input, IMPORT_TYPE_A)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for import directive type B', async () => {
      const input = 'import * as SomeName from "openzeppelin-solidity/CustomSafeMath.sol";';
      expect(builder.getMappingForImport(input, IMPORT_TYPE_B)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for import directive type C', async () => {
      const input = 'import {symbol1 as alias, symbol2} from "openzeppelin-solidity/CustomSafeMath.sol";';
      expect(builder.getMappingForImport(input, IMPORT_TYPE_C)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for a compilation unit', async () => {
      const input = `pragma solidity ^0.4.24;
      import "openzeppelin-solidity/CustomSafeMath.sol";
      import "Custom.sol";
      contract SomeCustomContract {
      }`;
      expect(builder.getMappingForUnit(input, IMPORT_TYPE_C)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });

    it('generates mapping for sources', async () => {
      const sources = ['./test/compiler/custom/custom_contracts/Custom.sol'];
      expect(builder.getMappings(sources)).to.deep.eq({'openzeppelin-solidity': expectedPath});
    });
  });
});
