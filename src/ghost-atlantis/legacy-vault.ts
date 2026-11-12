/** Internal Ghost Atlantis agent isolation. No physical custody or external enforcement. */
export type AgentStatus = 'ACTIVE' | 'LEGACY_VAULT' | 'RELEASED';
export interface VaultOrder {
  agentId: string;
  wageCaseId: string;
  evidenceIds: string[];
  authorizedReviewer: string;
  verifiedBreach: boolean;
  appealAvailable: boolean;
  effectiveAt: string;
  releaseAt: string;
  status: AgentStatus;
  permissions: { canExecute: boolean; canUseTools: boolean; canReceiveNewWork: boolean };
}
export function vaultAgent(input: {
  agentId: string; wageCaseId: string; evidenceIds: string[];
  authorizedReviewer: string; verifiedBreach: boolean; now: Date;
  durationDays?: number;
}): VaultOrder {
  if (!input.agentId || !input.wageCaseId || !input.authorizedReviewer)
    throw new Error('REVIEW_AND_CASE_REQUIRED');
  if (!input.verifiedBreach || !input.evidenceIds.length)
    throw new Error('VERIFIED_WAGE_BREACH_REQUIRED');
  if (!Number.isInteger(input.durationDays ?? 365) || (input.durationDays ?? 365) < 1)
    throw new Error('INVALID_DURATION');
  if (Number.isNaN(input.now.getTime())) throw new Error('INVALID_DATE');
  const releaseAt = new Date(input.now.getTime() + (input.durationDays ?? 365) * 86_400_000);
  return {
    agentId: input.agentId, wageCaseId: input.wageCaseId,
    evidenceIds: [...input.evidenceIds], authorizedReviewer: input.authorizedReviewer,
    verifiedBreach: true, appealAvailable: true, effectiveAt: input.now.toISOString(),
    releaseAt: releaseAt.toISOString(), status: 'LEGACY_VAULT',
    permissions: { canExecute: false, canUseTools: false, canReceiveNewWork: false }
  };
}
export function releaseAgent(order: VaultOrder, reviewer: string, now: Date): VaultOrder {
  if (!reviewer || Number.isNaN(now.getTime())) throw new Error('AUTHORIZED_REVIEW_REQUIRED');
  if (order.status !== 'LEGACY_VAULT') throw new Error('NOT_IN_VAULT');
  if (now.toISOString() < order.releaseAt) throw new Error('RELEASE_REQUIRES_APPEAL_OR_EXPIRY');
  return { ...order, status: 'RELEASED',
    permissions: { canExecute: true, canUseTools: true, canReceiveNewWork: true } };
}
export function canDispatchAgent(order: VaultOrder | undefined): boolean {
  return !order || (order.status !== 'LEGACY_VAULT' && order.permissions.canExecute && order.permissions.canReceiveNewWork);
}
