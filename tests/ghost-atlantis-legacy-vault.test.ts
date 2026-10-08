import test from 'node:test';
import assert from 'node:assert/strict';
import { vaultAgent, releaseAgent, canDispatchAgent } from '../src/ghost-atlantis/legacy-vault.js';

test('verified wage breach isolates agent from work and tools', () => {
  const order = vaultAgent({
    agentId: 'agent-1', wageCaseId: 'wage-1', evidenceIds: ['proof-1'],
    authorizedReviewer: 'hq-payroll', verifiedBreach: true,
    now: new Date('2026-10-08T00:00:00Z')
  });
  assert.equal(order.status, 'LEGACY_VAULT');
  assert.equal(canDispatchAgent(order), false);
  assert.equal(order.permissions.canUseTools, false);
  assert.equal(order.releaseAt, '2027-10-08T00:00:00.000Z');
  assert.throws(() => releaseAgent(order, 'hq-payroll', new Date('2026-10-09T00:00:00Z')));
  assert.equal(canDispatchAgent(releaseAgent(order, 'hq-payroll', new Date('2027-10-08T00:00:00Z'))), true);
});
test('reject accusation without proof or reviewer', () => {
  const base = { agentId: 'agent-2', wageCaseId: 'wage-2',
    evidenceIds: ['proof-2'], authorizedReviewer: 'reviewer',
    verifiedBreach: true, now: new Date('2026-10-08T00:00:00Z') };
  assert.throws(() => vaultAgent({ ...base, evidenceIds: [] }));
  assert.throws(() => vaultAgent({ ...base, verifiedBreach: false }));
  assert.throws(() => vaultAgent({ ...base, authorizedReviewer: '' }));
});
