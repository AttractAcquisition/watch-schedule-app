// Watch Schedule — PDF export placeholders.
// TODO: call PDF generation Edge Function.

export async function mockExportPdf(exportType = "bridge", scheduleId = "run_1") {
  // TODO: Replace with Supabase Edge Function
  // TODO: Apply RLS policies before production
  console.info("[pdf placeholder] mockExportPdf", scheduleId, exportType);
  return { url: "#" };
}

export const exportSchedulePdf = mockExportPdf;
