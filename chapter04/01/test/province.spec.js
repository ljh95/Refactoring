import { Province, sampleProvinceData } from '../province.js';
import assert from 'node:assert'

describe('province', function() {
  it('shorfall', function() {
    const asia = new Province(sampleProvinceData()); // 픽스처 설명
    assert.equal(asia.shortfall, 6); // 검증
  })
})