import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS, CURRICULUM, MISSIONS, planTraining, getMission, assessMission, evaluateSession } from '../src/training/soldier-of-fortune.js';

test('four tracks have sixteen modules and four distinct missions', () => {
  assert.equal(TRACKS.length, 4);
  assert.deepEqual(Object.keys(CURRICULUM).sort(), [...TRACKS].sort());
  assert.equal(Object.keys(MISSIONS).length, 4);
  for (const track of TRACKS) {
    assert.equal(CURRICULUM[track].length, 4);
    assert.equal(new Set(CURRICULUM[track].map(b => b.id)).size, 4);
    assert.equal(getMission(track).track, track);
    assert.equal(getMission(track).decisions.length, 3);
    assert.ok(getMission(track).decisions.every(d => d.options.length === 3));
  }
});

test('four-week phase plan is deterministic and bounded', () => {
  const weeks = planTraining('MARINE_CORPS');
  assert.equal(weeks.length, 4);
  assert.deepEqual(weeks.map(w => w.phase), ['BASELINE','BUILD','INTEGRATE','EVALUATE']);
  assert.ok(weeks.every(w => w.totalMinutes > 0 && w.blocks.length === 4));
  assert.deepEqual(planTraining('MARINE_CORPS'), weeks);
  assert.throws(() => planTraining('MARINE_CORPS', 0), /Weeks/);
  assert.throws(() => planTraining('MARINE_CORPS', 13), /Weeks/);
});

test('best answers give deterministic passing mission receipts on all tracks', () => {
  for (const track of TRACKS) {
    const mission = getMission(track);
    const answers = Object.fromEntries(mission.decisions.map(d => [d.id,'A']));
    const result = assessMission(track, answers);
    assert.equal(result.status, 'PASS');
    assert.equal(result.score, 100);
    assert.equal(result.criticalFailures, 0);
    assert.match(result.proofDigest, /^[0-9a-f]{64}$/);
    assert.deepEqual(assessMission(track, answers), result);
    assert.equal(result.evidenceClass, 'SIMULATION');
  }
});

test('critical mission error forces remediation', () => {
  const mission = getMission('BLACK_OPS');
  const answers = Object.fromEntries(mission.decisions.map(d => [d.id,'A']));
  answers['BO-B'] = 'B';
  const receipt = assessMission('BLACK_OPS', answers);
  assert.equal(receipt.status, 'REMEDIATION_REQUIRED');
  assert.equal(receipt.criticalFailures, 1);
});

test('decision assessment rejects invalid cardinality and values', () => {
  assert.throws(() => assessMission('MARINE_CORPS', {}), /Exactly one/);
  assert.throws(() => assessMission('MARINE_CORPS', {'USMC-A':'A','USMC-B':'A','USMC-C':'Z'}), /Invalid option/);
  assert.throws(() => assessMission('MARINE_CORPS', {'USMC-A':'A','USMC-B':'A','USMC-C':'A','OTHER':'A'}), /Exactly one/);
});

test('self-reported session is recorded but not verified or a qualification', () => {
  const result = evaluateSession({
    track:'NAVAL_SPECIAL_WARFARE', blockId:'NSW-01',
    minutes:120, completed:true, evidenceClass:'SELF_REPORT',
    afterActionReview:'Completed with planned rest',
  });
  assert.equal(result.status,'RECORDED');
  assert.equal(result.completionVerified,false);
  assert.equal(result.qualificationGranted,false);
  assert.match(result.proofDigest,/^[0-9a-f]{64}$/);
});

test('measured session needs evidence reference and block-track ownership', () => {
  const log = {
    track:'SPECIAL_FORCES' as const,
    blockId:'SF-01', minutes:100, completed:true,
    evidenceClass:'MEASURED' as const, afterActionReview:'Interpreter-led review',
  };
  assert.throws(() => evaluateSession(log), /Independent evidence/);
  const result = evaluateSession({...log,evidenceRef:'owned:proof/record-01'});
  assert.equal(result.completionVerified,true);
  assert.equal(result.qualificationGranted,false);
  assert.throws(() => evaluateSession({...log,minutes:-1}), /Invalid duration/);
  assert.throws(() => evaluateSession({...log,blockId:'NSW-01'}), /does not belong/);
});
