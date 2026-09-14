import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyScrollGeometry } from '../src/js/components/journey.js';

for (const [viewport, sticky, offset] of [[900, 600, 112], [1080, 660, 112], [800, 688, 112], [1440, 740, 112]]) {
  test(`REPORT is fully reachable when Journey ends the document at ${viewport}px height`, () => {
    const sectionTop = 3000;
    const { distance, sectionHeight } = journeyScrollGeometry(viewport, sticky, offset, 5);
    const start = sectionTop - offset;
    const end = start + distance;
    const maximumScroll = sectionTop + sectionHeight - viewport;
    assert.ok(maximumScroll >= end + viewport * 0.15 - 0.001);
    // The final frame remains sticky at its intended offset at the endpoint.
    assert.ok(sectionTop + sectionHeight - end >= offset + sticky);
    const width = 1440;
    const travel = 4 * width;
    const progress = Math.min(1, Math.max(0, (maximumScroll - start) / distance));
    assert.equal(4 * width - progress * travel, 0, 'last slide left edge aligns with viewport');
    for (let index = 0; index < 5; index++) {
      const target = start + distance * index / 4;
      assert.ok(target <= maximumScroll, `stage ${index + 1} navigation target is reachable`);
    }
  });
}
