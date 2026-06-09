import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { FairnessMetricCard } from "@/components/fairness/FairnessMetricCard";
import { FairnessBreakdown } from "@/components/fairness/FairnessBreakdown";
import { FairnessExplanation } from "@/components/fairness/FairnessExplanation";
import { MOCK_FAIRNESS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FairnessEngine() {
  const f = MOCK_FAIRNESS;
  return (
    <AppShell>
      <PageHeader
        eyebrow="Fairness Engine"
        title="Fairness Engine"
        description="Review how the rota balances watch load, weekends, nights, and repeated assignments."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("Regenerate affected watches placeholder.")}
            >
              Regenerate affected watches
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast("View schedule placeholder.")}>
              View schedule
            </Button>
            <Button size="sm" onClick={() => toast("Rota confirmed (mock).")}>
              Confirm rota
            </Button>
          </>
        }
      />
      <div className="mb-4 panel p-5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Main score
        </div>
        <div className="mt-2 text-4xl font-semibold tracking-tight">
          Overall Fairness Score: {f.overall}%
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <FairnessMetricCard label="Total watch balance" value={f.totalWatchBalance} />
        <FairnessMetricCard label="Weekend fairness" value={f.weekendFairness} />
        <FairnessMetricCard label="Night watch balance" value={f.nightWatchBalance} />
        <FairnessMetricCard label="Consecutive-day risk" value={f.consecutiveDayRisk} />
        <FairnessMetricCard label="Department balance" value={88} />
        <FairnessMetricCard label="Leave adjustment impact" value={72} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FairnessBreakdown />
        </div>
        <div className="space-y-4">
          <FairnessExplanation />
          <div className="panel p-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Warnings
            </div>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <div>Potential repeated night watch</div>
              <div>Crew member on leave</div>
              <div>Department coverage thin</div>
              <div>Manual override required</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
