import type { SDLCState } from '../contracts.js';

export const SDLC_LIFECYCLE: readonly SDLCState[] = [
  'INTAKE',
  'FORENSIC_DISCOVERY',
  'CANONICALIZATION',
  'REQUIREMENTS_LOCK',
  'DESIGN_LOCK',
  'IMPLEMENTATION_READY',
  'BUILDING',
  'INTEGRATING',
  'VERIFYING',
  'SECURITY_REVIEW',
  'RELEASE_READY',
  'DEPLOYING',
  'RUNTIME_VERIFICATION',
  'PROOF_GENERATION',
  'DOCUMENTING',
  'ARCHIVED',
] as const;

const legalTransitions: Readonly<Record<SDLCState, readonly SDLCState[]>> = {
  INTAKE: ['FORENSIC_DISCOVERY'],
  FORENSIC_DISCOVERY: ['CANONICALIZATION'],
  CANONICALIZATION: ['REQUIREMENTS_LOCK'],
  REQUIREMENTS_LOCK: ['DESIGN_LOCK'],
  DESIGN_LOCK: ['IMPLEMENTATION_READY'],
  IMPLEMENTATION_READY: ['BUILDING'],
  BUILDING: ['INTEGRATING'],
  INTEGRATING: ['VERIFYING'],
  VERIFYING: ['SECURITY_REVIEW', 'BUILDING'],
  SECURITY_REVIEW: ['RELEASE_READY', 'BUILDING'],
  RELEASE_READY: ['DEPLOYING', 'BUILDING'],
  DEPLOYING: ['RUNTIME_VERIFICATION', 'BUILDING'],
  RUNTIME_VERIFICATION: ['PROOF_GENERATION', 'DEPLOYING'],
  PROOF_GENERATION: ['DOCUMENTING'],
  DOCUMENTING: ['ARCHIVED'],
  ARCHIVED: [],
};

export function canTransitionSDLC(from: SDLCState, to: SDLCState): boolean {
  return legalTransitions[from].includes(to);
}

export function assertSDLCTransition(from: SDLCState, to: SDLCState): void {
  if (!canTransitionSDLC(from, to)) {
    throw new Error(`Illegal SDLC transition: ${from} -> ${to}`);
  }
}

export function validateSDLCPath(path: readonly SDLCState[]): void {
  if (path.length === 0 || path[0] !== 'INTAKE') {
    throw new Error('SDLC path must begin at INTAKE');
  }

  for (let index = 0; index < path.length - 1; index += 1) {
    assertSDLCTransition(path[index]!, path[index + 1]!);
  }
}
