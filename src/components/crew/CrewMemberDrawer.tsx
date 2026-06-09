import type { CrewMember } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function CrewMemberDrawer({
  open,
  member,
  onOpenChange,
}: {
  open: boolean;
  member: CrewMember | null;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full border-l border-border bg-surface sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{member?.name ?? "Crew member"}</SheetTitle>
          <SheetDescription>{member?.position}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input defaultValue={member?.name} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input defaultValue={member?.position} />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input defaultValue={member?.department} />
          </div>
          <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
            <Label>Watch eligibility</Label>
            <Switch defaultChecked={member?.watchEligible} />
          </div>
          <div className="space-y-2">
            <Label>Eligible roles</Label>
            <Input defaultValue={member?.eligibleRoles.join(", ").replace(/_/g, " ")} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Input defaultValue={member?.status.replace(/_/g, " ")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Leave start</Label>
              <Input defaultValue={member?.leaveStart ?? ""} />
            </div>
            <div className="space-y-2">
              <Label>Leave end</Label>
              <Input defaultValue={member?.leaveEnd ?? ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea defaultValue={member?.notes ?? ""} />
          </div>
          <div className="rounded-md border border-border px-3 py-2 font-mono text-[10px] text-muted-foreground">
            TODO: save to Supabase · {"{{SUPABASE_USER_ID}}"}
          </div>
          <Button
            className="w-full"
            onClick={() => {
              // TODO: save to Supabase
              toast("Crew member saved (mock).");
              onOpenChange(false);
            }}
          >
            Save changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
