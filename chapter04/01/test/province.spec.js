import { Province, sampleProvinceData } from '../province.js';
import assert from 'node:assert'
import expect from 'expect';

describe('province', function() {
  it('shorfall', function() {
    const asia = new Province(sampleProvinceData()); // 픽스처 설명
    // assert.equal(asia.shortfall, 5); // 검증
    expect(asia.shortfall).toEqual(5)
  })
})