// Watch Schedule — schedule engine placeholders.
// TODO: call schedule generation Edge Function.

import { MOCK_SCHEDULE, MOCK_FAIRNESS } from "./mockData";

export async function mockGenerateSchedule(_payload: unknown) {
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  return { schedule: MOCK_SCHEDULE, fairness: MOCK_FAIRNESS };
}

export async function mockRegenerateSchedule(_payload: unknown) {
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  return { schedule: MOCK_SCHEDULE, fairness: MOCK_FAIRNESS };
}

export async function mockPauseCharter(_payload: unknown) {
  // TODO: Replace with Supabase database insert/update
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  return { ok: true };
}

export async function mockResumeCharter(_scheduleId: string) {
  // TODO: Replace with Supabase database insert/update
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  return { ok: true };
}

export const generateWatchSchedule = mockGenerateSchedule;
export const regenerateAffectedWatches = mockRegenerateSchedule;
export const pauseScheduleForCharter = mockPauseCharter;
export const resumeScheduleAfterCharter = mockResumeCharter;
