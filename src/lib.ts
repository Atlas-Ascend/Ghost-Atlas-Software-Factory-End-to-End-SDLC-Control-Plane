import { createHash, randomUUID } from 'node:crypto';
import type { EstateEvent, Stage } from './contracts.js';

export const now = () => new Date().toISOString();
export const id = (prefix: string) => `${prefix}-${randomUUID()}`;
export const digest = (value: string) => createHash('sha256').update(value).digest('hex');

export function event<T>(runId: string, correlationId: string, stage: Stage, type: string, producer: string, payload: T): EstateEvent<T> {
  return {
    eventId: id('evt'),
    correlationId,
    runId,
    stage,
    type,
    occurredAt: now(),
    producer,
    payload,
  };
}
