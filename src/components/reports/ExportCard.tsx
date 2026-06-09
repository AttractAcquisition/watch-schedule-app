import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { exportSchedulePdf } from "@/lib/pdfPlaceholder";

export function ExportCard({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant: string;
}) {
  return (
    <div className="panel flex flex-col p-5">
      <div className="text-sm font-medium">{title}</div>
      <p className="mt-1 flex-1 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="outline" onClick={() => toast("PDF preview placeholder.")}>
          Preview
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await exportSchedulePdf(variant, "run_1"); // TODO: generate PDF through backend function
            toast(`${title} PDF placeholder — backend connection required.`);
          }}
        >
          <Download className="h-3.5 w-3.5" /> Export PDF
        </Button>
      </div>
      <div className="mt-3 font-mono text-[10px] text-muted-foreground">
        TODO: generate PDF through backend function
      </div>
    </div>
  );
}
