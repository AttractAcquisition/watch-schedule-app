import { MOCK_CREW, MOCK_VESSEL } from "@/lib/mockData";
import { PLAN_LABEL } from "@/lib/constants";

export function ReviewSetupStep() {
  const deps = Array.from(new Set(MOCK_CREW.map((c) => c.department)));
  const rows = [
    ["Vessel", MOCK_VESSEL.name],
    ["Plan", PLAN_LABEL[MOCK_VESSEL.plan]],
    ["Crew count", String(MOCK_CREW.length)],
    ["Departments", deps.join(", ")],
    ["Watch mode", "Triple Watch"],
    ["Department breakdown", "Command 2 · Deck 4 · Engineering 3 · Interior 5"],
    [
      "Rules enabled",
      "Weekend rotation, fairness balancing, charter pauses, leave management, rest-hour aware warnings, Submit & Confirm",
    ],
  ];
  return (
    <div className="space-y-4">
      <div className="panel divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[180px_1fr] gap-4 px-5 py-3 text-sm">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {k}
            </div>
            <div>{v}</div>
          </div>
        ))}
      </div>
      <div className="panel p-4 text-xs text-muted-foreground">
        Crew and vessel data will be protected through authenticated access and vessel-level
        permissions once Supabase is connected.
      </div>
    </div>
  );
}
