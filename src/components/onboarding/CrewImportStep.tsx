import { CrewImportMockup } from "@/components/crew/CrewImportMockup";
import type { ExtractedCrewMember } from "@/lib/edgeFunctions";

interface CrewImportStepProps {
  onCrewExtracted?: (crew: ExtractedCrewMember[]) => void;
}

export function CrewImportStep({ onCrewExtracted }: CrewImportStepProps) {
  return (
    <div className="space-y-4">
      <CrewImportMockup onExtracted={onCrewExtracted} />
      <div className="text-xs text-muted-foreground">
        You can skip this step and add crew from Settings after setup is complete.
      </div>
    </div>
  );
}
