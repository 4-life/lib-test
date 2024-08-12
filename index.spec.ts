import assert from 'assert';
import { getRecordByPathRecursively, getRecordItemsByPathRecursively, getRecordsSequenceByPath } from './dist/index.js';
import dictionary1 from './mocks/dictionary1.js';
import result1 from './mocks/result1.js';
import result2 from './mocks/result2.js';
import result3 from './mocks/result3.js';

describe('Test', function () {
  describe('getRecordByPathRecursively', function () {
    it('should return dictionary item', function () {
      assert.deepEqual(getRecordByPathRecursively(dictionary1, '/Prod/PythonPS/L1SL', 'JunSoftEngin'), result1);
    });
    it('should return key string when item not found', function () {
      assert.deepEqual(getRecordByPathRecursively(dictionary1, '/', 'not found str'), 'not found str');
    });
  });

  describe('getRecordItemsByPathRecursively', function () {
    it('should return dictionary items', function () {
      assert.deepEqual(getRecordItemsByPathRecursively(dictionary1, '/Prod', 'DevOpsPS'), result2);
    });
    it('should return empty array when item not found', function () {
      assert.deepEqual(getRecordItemsByPathRecursively(dictionary1, '/', 'not found str'), []);
    });
  });

  describe('getRecordsSequenceByPath', function () {
    it('should return dictionary items', function () {
      assert.deepEqual(getRecordsSequenceByPath(dictionary1, '/Prod/PythonPS/L2SL'), result3);
    });
    it('should return empty object when item not found', function () {
      assert.deepEqual(getRecordsSequenceByPath(dictionary1, 'not found str'), {});
    });
  });
});
