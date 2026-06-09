// Watch Schedule — Supabase data placeholders.
// TODO: replace every function here with real Supabase queries or server functions.

import { MOCK_CREW, MOCK_VESSEL } from "./mockData";
import type { CrewMember } from "./types";

export async function getVesselProfile(_userId: string) {
  // TODO: select * from vessels where owner_id = userId
  return MOCK_VESSEL;
}

export async function getCrewMembers(_vesselId: string): Promise<CrewMember[]> {
  // TODO: select * from crew_members where vessel_id = vesselId
  return MOCK_CREW;
}

export async function mockSaveCrewDatabase(_vesselId: string, crew: CrewMember[]) {
  // TODO: Replace with Supabase database insert/update
  // TODO: Apply RLS policies before production
  console.info("[supabase placeholder] mockSaveCrewDatabase", crew.length);
  return { ok: true };
}

export async function mockUploadCrewList(_file?: File) {
  // TODO: Replace with Supabase database insert/update
  // TODO: Apply RLS policies before production
  return { fileId: "upload_mock_1" };
}

export async function mockExtractCrewFromPhoto(_fileId: string) {
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  return MOCK_CREW.slice(0, 8);
}

export const saveCrewMembers = mockSaveCrewDatabase;
export const uploadCrewListPhoto = mockUploadCrewList;
export const extractCrewFromPhoto = mockExtractCrewFromPhoto;
