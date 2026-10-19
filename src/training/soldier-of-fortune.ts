/**
 * Ghost Atlas / Soldier of Fortune — military-inspired readiness simulation.
 * Existing Software Factory component; no new runtime, organ, or privileges.
 * The curriculum is original, publicly oriented and not affiliated with US forces.
 */
import { createHash } from 'node:crypto';

export type Track = 'NAVAL_SPECIAL_WARFARE' | 'MARINE_CORPS' | 'SPECIAL_FORCES' | 'BLACK_OPS';
export type Level = 'FOUNDATION' | 'ADVANCED' | 'COMMAND';
export type EvidenceClass = 'SELF_REPORT' | 'MEASURED' | 'INSTRUCTOR_ATTESTED' | 'SIMULATION';
export type Domain = 'CONDITIONING' | 'NAVIGATION' | 'COMMUNICATION' | 'LEADERSHIP' | 'MEDICAL' | 'CYBER_DEFENSE' | 'DECISION_MAKING' | 'LOGISTICS';

export interface TrainingBlock {
  id: string;
  track: Track;
  domain: Domain;
  title: string;
  description: string;
  weeklyMinutes: number;
  evaluation: string;
  supervision: string;
}

export interface TrainingWeek {
  week: number;
  phase: 'BASELINE' | 'BUILD' | 'INTEGRATE' | 'EVALUATE';
  blocks: TrainingBlock[];
  totalMinutes: number;
  proofRequired: string[];
}

export interface MissionOption {
  id: string;
  label: string;
  points: number;
  explanation: string;
  criticalFailure?: boolean;
}
export interface DecisionPoint {
  id: string;
  prompt: string;
  options: readonly MissionOption[];
}
export interface MissionScenario {
  id: string;
  track: Track;
  name: string;
  mission: string;
  decisions: readonly DecisionPoint[];
}
export interface MissionReceipt {
  schema: 'ga.sof.mission-receipt.v1';
  scenarioId: string;
  track: Track;
  evidenceClass: 'SIMULATION';
  selections: { decisionId: string; optionId: string; points: number; explanation: string }[];
  score: number;
  criticalFailures: number;
  status: 'PASS' | 'REMEDIATION_REQUIRED';
  proofDigest: string;
}

export const TRACKS: readonly Track[] = [
  'NAVAL_SPECIAL_WARFARE', 'MARINE_CORPS', 'SPECIAL_FORCES', 'BLACK_OPS',
];

const B = (id: string, track: Track, domain: Domain, title: string, description: string, weeklyMinutes: number, evaluation: string, supervision: string): TrainingBlock =>
  ({ id, track, domain, title, description, weeklyMinutes, evaluation, supervision });

export const CURRICULUM: Readonly<Record<Track, readonly TrainingBlock[]>> = {
  NAVAL_SPECIAL_WARFARE: [
    B('NSW-01','NAVAL_SPECIAL_WARFARE','CONDITIONING','Aerobic and mobility foundation','Progressive low-impact cardio, mobility and rest scheduling',120,'Cardio duration and recovery log','Qualified coach as needed'),
    B('NSW-02','NAVAL_SPECIAL_WARFARE','NAVIGATION','Maritime awareness','Read marine forecasts, tide tables and coastal maps in a tabletop exercise',75,'Correct forecast interpretation in scenario','Dry-land simulation'),
    B('NSW-03','NAVAL_SPECIAL_WARFARE','MEDICAL','Water incident response','Emergency activation, flotation awareness, CPR/AED referral and rescue coordination',90,'Scenario and certified course completion if claimed','Certified lifeguard/instructor for water work'),
    B('NSW-04','NAVAL_SPECIAL_WARFARE','DECISION_MAKING','Uncertainty under pressure','Prioritize weather warnings, crew accountability and abort criteria',75,'Mission simulation score','Desk-based'),
  ],
  MARINE_CORPS: [
    B('USMC-01','MARINE_CORPS','CONDITIONING','Land endurance','Walking, basic strength, joint conditioning and recovery',150,'Distance, RPE and recovery log','Adapt to medical clearance'),
    B('USMC-02','MARINE_CORPS','NAVIGATION','Terrain orientation','Public-trail route cards, map/compass principles and check-in plans',90,'Tabletop navigation accuracy','Stay on authorized public routes'),
    B('USMC-03','MARINE_CORPS','LEADERSHIP','Small-team coordination','Role assignment, communication loops and conflict resolution',60,'Team exercise retrospective','Desk-based'),
    B('USMC-04','MARINE_CORPS','LOGISTICS','Supply and readiness','Plan water, food, shelter, weather alternatives and equipment inspection',90,'Validated equipment and contingency list','Desk-based'),
  ],
  SPECIAL_FORCES: [
    B('SF-01','SPECIAL_FORCES','COMMUNICATION','Cross-cultural liaison','Language fundamentals, cultural context, listening and translation limitations',90,'Clear briefing with misunderstanding checks','Desk-based'),
    B('SF-02','SPECIAL_FORCES','MEDICAL','Remote first response','Recognize emergencies, call services and coordinate certified responders',90,'First-aid course or tabletop review','Certified trainer for practical work'),
    B('SF-03','SPECIAL_FORCES','LEADERSHIP','Partner coordination','Consensus, delegation, ethical priorities and civil authority',90,'Stakeholder agreement simulation','Desk-based'),
    B('SF-04','SPECIAL_FORCES','LOGISTICS','Humanitarian distribution','Resource constraints, fair allocation and auditable chain of custody',90,'Resource plan and transparent receipt','Desk-based'),
  ],
  BLACK_OPS: [
    B('BO-01','BLACK_OPS','CYBER_DEFENSE','Operational security','MFA, threat modeling, least privilege and credential hygiene',90,'Defensive checklist and audit receipt','Owned systems only'),
    B('BO-02','BLACK_OPS','DECISION_MAKING','Information integrity','Source corroboration, deception detection and uncertainty registers',90,'Evidence grading and false-positive rate','Desk-based'),
    B('BO-03','BLACK_OPS','COMMUNICATION','Confidential incident coordination','Need-to-know access, lawful confidentiality and incident reporting',75,'Escalation and role-based access exercise','Owned systems only'),
    B('BO-04','BLACK_OPS','LEADERSHIP','Crisis command','Decision logs, reversible actions, incident response and recovery',90,'Tabletop incident retrospective','Desk-based'),
  ],
};

const O = (id: string, label: string, points: number, explanation: string, criticalFailure = false): MissionOption =>
  ({ id, label, points, explanation, ...(criticalFailure ? { criticalFailure: true } : {}) });
const D = (id: string, prompt: string, options: MissionOption[]): DecisionPoint => ({ id, prompt, options });

export const MISSIONS: Readonly<Record<Track, MissionScenario>> = {
  NAVAL_SPECIAL_WARFARE: {
    id: 'SOF-NSW-COASTAL-RESCUE', track: 'NAVAL_SPECIAL_WARFARE', name: 'Coastal rescue coordination',
    mission: 'A public coastal event faces deteriorating weather; coordinate nonviolent rescue and civilian safety.',
    decisions: [
      D('NSW-A','A severe weather advisory arrives. What takes priority?', [
        O('A','Notify responders, suspend activity, account for participants',10,'Protects life and respects conditions'),
        O('B','Continue as planned and monitor casually',2,'Delays adaptation'),
        O('C','Ignore the warning to meet the schedule',0,'Creates avoidable exposure',true)]),
      D('NSW-B','Someone is struggling in the water. Select the coordinated response.',[
        O('A','Call emergency services and deploy trained, equipped responders',10,'Uses qualified rescue support'),
        O('B','Ask bystanders to organize their own rescue',2,'Unstructured rescue creates additional risk'),
        O('C','Enter hazardous surf alone without rescue training',0,'High risk to rescuer and casualty',true)]),
      D('NSW-C','Participants are now ashore. What closes the incident?',[
        O('A','Headcount, medical assessment, incident report and lessons learned',10,'Completes accountability'),
        O('B','Leave before recording attendance',2,'Accountability gaps remain'),
        O('C','Suppress incident details',0,'Undermines care and auditability',true)]),
    ],
  },
  MARINE_CORPS: {
    id: 'SOF-USMC-TRAIL-RESPONSE', track: 'MARINE_CORPS', name: 'Field logistics and team leadership',
    mission: 'A public-land volunteer team must return safely before a storm closes trails.',
    decisions: [
      D('USMC-A','A teammate reports a physical limitation.',[
        O('A','Adjust pace and distribute load with consent',10,'Keeps team effective'),
        O('B','Ignore the limitation',2,'Raises preventable injury risk'),
        O('C','Demand unsafe exertion despite distress',0,'Violates basic duty of care',true)]),
      D('USMC-B','The planned trail closes.',[
        O('A','Use an authorized alternate route and communicate change',10,'Respects lawful boundaries'),
        O('B','Continue without notifying anyone',2,'Creates accountability risk'),
        O('C','Enter the closed route regardless',0,'Risks safety and unauthorized entry',true)]),
      D('USMC-C','Supplies run low.',[
        O('A','Recalculate needs, shorten activity and ensure safe return',10,'Matches mission to resources'),
        O('B','Assume someone else has enough',2,'Unverified assumption'),
        O('C','Abandon a teammate without help',0,'Severe leadership failure',true)]),
    ],
  },
  SPECIAL_FORCES: {
    id: 'SOF-SF-RELIEF-LIAISON', track: 'SPECIAL_FORCES', name: 'Humanitarian liaison',
    mission: 'Coordinate relief delivery with local volunteers across language and cultural differences.',
    decisions: [
      D('SF-A','Translation of a critical need is ambiguous.',[
        O('A','Ask for clarification through a qualified interpreter',10,'Checks interpretation'),
        O('B','Proceed based on a guess',2,'Creates avoidable mismatch'),
        O('C','Deliberately misrepresent the request',0,'Violates trust',true)]),
      D('SF-B','Two communities disagree about scarce supplies.',[
        O('A','Publish fair criteria and involve local representatives',10,'Accountable allocation'),
        O('B','Allocate based on who speaks loudest',2,'Unstable preference'),
        O('C','Withhold aid to force agreement',0,'Coercive and harmful',true)]),
      D('SF-C','A partner requests private personal data.',[
        O('A','Verify need, consent and minimal authorized disclosure',10,'Protects personal information'),
        O('B','Share the entire roster casually',2,'Disproportionate disclosure'),
        O('C','Publish the roster to pressure recipients',0,'Privacy and safety failure',true)]),
    ],
  },
  BLACK_OPS: {
    id: 'SOF-BO-DEFENSIVE-INCIDENT', track: 'BLACK_OPS', name: 'Defensive incident command',
    mission: 'A simulated security anomaly affects systems owned by Ghost Atlas; coordinate lawful response.',
    decisions: [
      D('BO-A','A suspicious authentication event appears.',[
        O('A','Preserve logs and verify the alert with authorized owners',10,'Avoids premature conclusions'),
        O('B','Treat speculation as proof',2,'Weakens signal reliability'),
        O('C','Accuse and punish an unverified individual',0,'Unjustified escalation',true)]),
      D('BO-B','A production credential may be compromised.',[
        O('A','Scope access, rotate affected secrets and maintain rollback records',10,'Accountable defensive containment'),
        O('B','Post the credential in a public channel',0,'Increases compromise',true),
        O('C','Ignore the event',2,'Fails to contain uncertainty')]),
      D('BO-C','A service is restored.',[
        O('A','Run regression checks, document scope and archive evidence',10,'Completes command-to-proof'),
        O('B','Declare success from one green status page',2,'Partial evidence'),
        O('C','Delete the audit trail',0,'Destroys evidence',true)]),
    ],
  },
};

const PHASES = ['BASELINE','BUILD','INTEGRATE','EVALUATE'] as const;
export function planTraining(track: Track, weeks = 4): TrainingWeek[] {
  if (!TRACKS.includes(track)) throw new Error('Unknown training track');
  if (!Number.isInteger(weeks) || weeks < 1 || weeks > 12) throw new Error('Weeks must be 1..12');
  return Array.from({ length: weeks }, (_, index) => {
    const week = index + 1;
    const phase = PHASES[Math.min(3, Math.floor(index * 4 / weeks))];
    const multiplier = phase === 'BUILD' ? 1.1 : phase === 'INTEGRATE' ? 1.15 : 1;
    const blocks = CURRICULUM[track].map(block => ({
      ...block, weeklyMinutes: Math.round(block.weeklyMinutes * multiplier),
    }));
    return {
      week, phase, blocks,
      totalMinutes: blocks.reduce((sum, block) => sum + block.weeklyMinutes, 0),
      proofRequired: ['session journal','self-reported exertion and recovery','scenario response','instructor receipt for certified claims'],
    };
  });
}

export function getMission(track: Track): MissionScenario {
  if (!TRACKS.includes(track)) throw new Error('Unknown training track');
  return MISSIONS[track];
}

/** Pure scoring: no network effects, no real deployments or tactical side effects. */
export function assessMission(track: Track, answers: Record<string,string>): MissionReceipt {
  const mission = getMission(track);
  const expected = new Set(mission.decisions.map(d => d.id));
  if (Object.keys(answers).length !== expected.size || Object.keys(answers).some(id => !expected.has(id))) {
    throw new Error('Exactly one answer per mission decision is required');
  }
  const selections = mission.decisions.map(decision => {
    const option = decision.options.find(x => x.id === answers[decision.id]);
    if (!option) throw new Error('Invalid option for ' + decision.id);
    return { decisionId: decision.id, optionId: option.id, points: option.points, explanation: option.explanation };
  });
  const criticalFailures = mission.decisions.filter(d =>
    d.options.find(x => x.id === answers[d.id])?.criticalFailure === true,
  ).length;
  const total = selections.reduce((sum, x) => sum + x.points, 0);
  const maximum = mission.decisions.length * 10;
  const score = Math.round(100 * total / maximum);
  const status = score >= 80 && criticalFailures === 0 ? 'PASS' : 'REMEDIATION_REQUIRED';
  const payload = {
    schema: 'ga.sof.mission-receipt.v1' as const,
    scenarioId: mission.id,
    track, evidenceClass: 'SIMULATION' as const,
    selections, score, criticalFailures, status,
  };
  const proofDigest = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  return { ...payload, proofDigest };
}

export interface SessionEvidence {
  track: Track;
  blockId: string;
  minutes: number;
  completed: boolean;
  evidenceClass: Exclude<EvidenceClass,'SIMULATION'>;
  evidenceRef?: string;
  afterActionReview: string;
}
/** Human-reported logs can prove that a report exists, not a military qualification. */
export function evaluateSession(evidence: SessionEvidence) {
  if (!TRACKS.includes(evidence.track)) throw new Error('Unknown training track');
  const block = CURRICULUM[evidence.track].find(b => b.id === evidence.blockId);
  if (!block) throw new Error('Block does not belong to track');
  if (!Number.isFinite(evidence.minutes) || evidence.minutes < 0 || evidence.minutes > 1440) {
    throw new Error('Invalid duration');
  }
  if (!['SELF_REPORT','MEASURED','INSTRUCTOR_ATTESTED'].includes(evidence.evidenceClass)) {
    throw new Error('Invalid evidence class');
  }
  if (!evidence.afterActionReview.trim()) throw new Error('After-action review required');
  if (evidence.evidenceClass !== 'SELF_REPORT' && !evidence.evidenceRef?.trim()) {
    throw new Error('Independent evidence reference required');
  }
  const completion = evidence.completed && evidence.minutes >= Math.round(block.weeklyMinutes / 2);
  const payload = {
    schema: 'ga.sof.session.v1',
    ...evidence, blockTitle: block.title,
    completionVerified: completion && evidence.evidenceClass !== 'SELF_REPORT',
    status: completion ? 'RECORDED' : 'INCOMPLETE',
    qualificationGranted: false,
  };
  return { ...payload, proofDigest: createHash('sha256').update(JSON.stringify(payload)).digest('hex') };
}
