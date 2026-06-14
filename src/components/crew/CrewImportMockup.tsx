import { useRef, useState } from "react";
import { Camera, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractCrewFromPhoto, type ExtractedCrewMember } from "@/lib/edgeFunctions";
import { toast } from "sonner";

interface CrewImportMockupProps {
  onExtracted?: (crew: ExtractedCrewMember[]) => void;
}

const DEPT_LABELS: Record<ExtractedCrewMember["department"], string> = {
  command: "Command",
  deck: "Deck",
  interior: "Interior",
  engineering: "Engineering",
  unassigned: "Unassigned",
};

export function CrewImportMockup({ onExtracted }: CrewImportMockupProps) {
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ExtractedCrewMember[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast.error("Please upload an image file (JPG, PNG) or PDF.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setExtracted(null);
    setBusy(true);

    try {
      const base64 = await fileToBase64(file);
      const result = await extractCrewFromPhoto({
        image_base64: base64,
        media_type: file.type || "image/jpeg",
      });

      if (result.crew.length === 0) {
        toast.warning("No crew members detected. Check the image is a crew list and try again.");
      } else {
        toast.success(`Extracted ${result.crew.length} crew member${result.crew.length === 1 ? "" : "s"}.`);
      }

      setExtracted(result.crew);
      onExtracted?.(result.crew);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Extraction failed. Try again.");
      setExtracted([]);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setPreview(null);
    setExtracted(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-4">
      <div className="panel p-6">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Import crew from photo
        </div>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Photograph or upload your crew list. Claude will extract names, positions, and departments
          for captain confirmation before saving.
        </p>

        {!preview ? (
          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-surface/60 py-10 text-center text-sm text-muted-foreground transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground">
            <Upload className="h-5 w-5" />
            <span>Drag and drop a crew list photo, or click to upload</span>
            <span className="text-[11px]">JPG, PNG or PDF</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) processFile(f);
              }}
            />
          </label>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Crew list preview"
                className="max-h-48 rounded-md border border-border object-contain"
              />
              <button
                onClick={reset}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            {busy && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analysing crew list…
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            <Camera className="h-3.5 w-3.5" />
            {preview ? "Use different photo" : "Choose photo"}
          </Button>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Extraction is a setup assistant. Confirm all crew before saving to the rota.
        </p>
      </div>

      {extracted !== null && extracted.length > 0 && (
        <div className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Extracted crew ({extracted.length})
          </div>
          <div className="mt-3 space-y-2">
            {extracted.map((member, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium">{member.full_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {[member.position, member.rank].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {DEPT_LABELS[member.department]}
                </Badge>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Review departments above, then confirm to add these crew members to the rota.
          </p>
        </div>
      )}

      {extracted !== null && extracted.length === 0 && !busy && (
        <p className="text-sm text-muted-foreground">
          No crew members found. Try a clearer photo or add crew manually.
        </p>
      )}
    </div>
  );
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      if (base64) resolve(base64);
      else reject(new Error("Failed to read file as base64."));
    };
    reader.onerror = () => reject(new Error("File read error."));
    reader.readAsDataURL(file);
  });
}
