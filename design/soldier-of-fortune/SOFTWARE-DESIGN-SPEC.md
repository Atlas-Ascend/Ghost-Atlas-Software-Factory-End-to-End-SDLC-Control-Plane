# GHOST ATLAS — SOLDIER OF FORTUNE
## Navy SEAL / Marine Corps / Green Beret / BLACK OPS — Software Design Contract

**ID:** GA-SOF-TRAINING-20261018
**Class:** Military-inspired physical readiness, field skills, simulation, command and defensible proof
**Canonical owner:** Existing Ghost Atlas Software Factory / End-to-End SDLC Control Plane
**Status:** Source candidate, pending CI/review and EDEN runtime integration
**Scope:** Four tracks, sixteen course blocks, four three-stage scenarios, evidence-bound training logs.

## Command and organs

This design patches the canonical Software Factory. Atlas Mind owns adaptive planning and curriculum retrieval. Janus/Odin authorizes approved exercises. Packet OS stores atomic assignments. Workforce Spine schedules the learning cycle. MetaForge maintains the code. EDEN/Cali executes authorized owned-device tasks. Quetzalcoatl/CrownGrid registers the existing capability. Thoth retains reflective logs. Medusa handles privacy and authorization. SECA/DevOS verifies implementation and runtime behavior. ProofGrid stores durable receipts.

The four military names are inspirational curriculum labels. These courses are independently authored and do not represent military unit affiliation, rank, official qualification, clearance, or professional tactical certification.

## Four operational lanes

| Training lane | Domain | Foundation blocks | Tabletop simulation |
|---|---|---|---|
| Naval Special Warfare / SEAL | Maritime endurance, weather, water safety, leadership | Aerobic conditioning; maritime forecasts; rescue coordination; uncertain decisions | Coastal Rescue |
| Marine Corps | Team endurance, land navigation, group leadership, field logistics | Land conditioning; terrain orientation; team coordination; supply readiness | Trail Response |
| Special Forces / Green Beret | Communication, civil-military cooperation, humanitarian logistics | Cross-cultural liaison; first response; partner coordination; fair resource distribution | Relief Liaison |
| BLACK OPS | Defensive OPSEC, information integrity, confidentiality, incident command | MFA and least privilege; source corroboration; confidential incident coordination; crisis command | Defensive Incident Response |

### The 12-week capability model

- FOUNDATION: sustainable conditioning, emergency awareness, basic navigation, accountable communication, problem framing.
- ADVANCED: integrated planning, higher uncertainty, team communications, progressive stamina, recorded scenario decisions.
- COMMAND: reversible crisis decisions, consent-based leadership, civilian accountability, evidence tracking, secure coordination.

The executable program currently produces 1–12 week plans through four phases: BASELINE, BUILD, INTEGRATE and EVALUATE. These levels and the 12-week expanded curriculum are design-stage educational goals, not separate certifications.

## Runtime architecture

Operator -> Atlas Mind -> JANUS / Packet OS -> Soldier of Fortune module
- planTraining(track, weeks): deterministic four-block weekly plans
- getMission(track): complete scenario with three decision points
- assessMission(track, decisionMap): scored deterministic simulation receipt
- evaluateSession(session): separately classified session report
-> SECA/DevOS test readback -> Medusa policy review -> ProofGrid receipt candidate -> Thoth provenance

Implementation uses a new module inside the **existing** software delivery repository. It makes no network calls, runs no physical devices, operates no weapons, issues no field orders and does not authorize third-party access.

## Scoring engine and proof model

Scenario choices carry integer values 0 through 10, three decisions per mission. The engine normalizes the result to 0–100. A score of 80 or higher with no critical-failure flags passes the **simulation**; all other attempts return remediation required. Missing, extra or invalid decision keys are rejected.

Mission receipt: schema ga.sof.mission-receipt.v1; scenarioId, track, evidenceClass=SIMULATION, selections, score, criticalFailures, status, proofDigest. The SHA-256 digest is calculated over the deterministic serialized receipt payload before adding proofDigest. It is repeatable for identical submitted answers.

Human fieldwork session: track, blockId, duration, completion assertion, evidence class, external evidence reference when applicable, after-action review, qualificationGranted=false. SELF_REPORT means the report exists. MEASURED or INSTRUCTOR_ATTESTED requires a reference and may mark the logged requirement complete; actual third-party source verification remains a separate SECA/DevOS evidence gate. A score never awards an official military qualification.

## Safety, privacy and implementation boundaries

- Fitness and endurance progression includes recovery, adaptation and individual screening. No mandatory dangerous exertion or deprivation.
- In-water skills demand professionally supervised environments; emergency response practices must not substitute for certified training.
- BLACK OPS is defensive cyber hygiene, incident command, confidentiality and analytic discrimination. No offensive intrusion, covert access or real-person targeting.
- Field navigation uses authorized routes and civil emergency coordination.
- Individual medical and physical information is minimized; future persistent journals need authenticated access and encryption.
- Logging a path to evidence is distinct from verifying the evidence.
- No model-weight update, live readiness deployment or autonomous agent promotion is implied by a passing source simulation.

## Software lifecycle & acceptance

| Gate | Criteria | Evidence |
|---|---|---|
| S1 | Four tracks with 16 distinct blocks | Typed CURRICULUM and tests |
| S2 | Four distinct three-decision missions | Typed MISSIONS and tests |
| S3 | Correct 1–12 week plans | planTraining, input bounds, regression |
| S4 | Full scenario validation and refusal of incomplete decisions | assessMission and tests |
| S5 | Critical failures trigger remediation | criticalFailures policy and tests |
| S6 | SHA-256 deterministic receipt | proofDigest and duplicate-run test |
| S7 | Human logs retain truth class and no false rank/qualification | evaluateSession and tests |
| S8 | TypeScript build and existing Software Factory regression | npm run check |
| S9 | EDEN endpoint & authorized command bus | Pending observed runtime adapter |
| S10 | Medusa/SECA/ProofGrid production clearance | Pending audited release receipt |

## Local commands

    npm install
    npm run check
    npm run sof -- list
    npm run sof -- plan MARINE_CORPS 4
    npm run sof -- scenario BLACK_OPS
    npm run sof -- assess BLACK_OPS BO-A=A BO-B=A BO-C=A

## Future in-place wiring

Packet OS training envelope should include: packetId, track, blockId, current phase, objective, prerequisites, consent/authority class, completion evidence policy, due time, afterActionReview and idempotency key. CrownGrid registers SOF_READINESS_SIMULATION only when the actual API entrypoint and live capability receipts exist; Thoth records lesson summaries. A SECA-signed adapter test demonstrates a command moving through Atlas Mind -> Packet OS -> EDEN -> ProofGrid.

**Definition of finished:** CI passes, existing SDLC regression is unaffected, all four flows produce valid auditable source simulation receipts, live routing is observed and security/evidence checks are approved. Until that readback exists, this is an implemented software design candidate.
