import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { uploadCrewListPhoto, extractCrewFromPhoto } from "@/lib/supabasePlaceholder";
import type { CrewMember } from "@/lib/types";
import { toast } from "sonner";

export function CrewImportMockup({ onExtracted }: { onExtracted?: (crew: CrewMember[]) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="panel p-6">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Import your crew list
      </div>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Upload or photograph the crew list. Watch Schedule will extract names and positions, then
        suggest departments for captain approval.
      </p>
      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background/50 py-10 text-center text-sm text-muted-foreground hover:bg-secondary/40">
        <Upload className="h-5 w-5" />
        <span>Drag and drop a crew list photo, or click to upload</span>
        <span className="text-[11px]">JPG, PNG or PDF · placeholder upload</span>
        <input
          type="file"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            const { fileId } = await uploadCrewListPhoto(f); // TODO: real upload
            const crew = await extractCrewFromPhoto(fileId); // TODO: real OCR
            setBusy(false);
            toast("Crew list extracted (mock).");
            onExtracted?.(crew);
          }}
        />
      </label>
      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            const crew = await extractCrewFromPhoto("mock"); // TODO: real OCR
            setBusy(false);
            toast("Crew list extracted (mock).");
            onExtracted?.(crew);
          }}
        >
          {busy ? "Extracting..." : "Extract Crew List"}
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Extraction is a setup assistant. The captain confirms all crew before saving.
      </p>
    </div>
  );
}
