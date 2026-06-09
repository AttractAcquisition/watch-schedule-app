import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { ScheduleGrid } from "@/components/schedule/ScheduleGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MOCK_CHARTER } from "@/lib/mockData";

export default function ScheduleCalendar() {
  const [dept, setDept] = useState("all");

  return (
    <AppShell>
      <PageHeader
        eyebrow="Calendar View"
        title="Calendar View"
        description="View the confirmed rota across days, weeks, departments, and charter pauses."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("Regenerate schedule placeholder.")}
            >
              Regenerate schedule
            </Button>
            <Button size="sm" onClick={() => toast("PDF export placeholder.")}>
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast("Add leave placeholder.")}>
              Add leave
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast("Pause for charter placeholder.")}
            >
              Pause for charter
            </Button>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs defaultValue="week">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            <SelectItem value="deck">Deck</SelectItem>
            <SelectItem value="interior">Interior</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="command">Command</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScheduleGrid filterDept={dept} />

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="panel p-4 text-xs text-muted-foreground">
          <span className="text-foreground">Charter overlay</span> · paused from{" "}
          {MOCK_CHARTER.startDate} to {MOCK_CHARTER.endDate}.
        </div>
        <div className="panel p-4 text-xs text-muted-foreground">
          <span className="text-foreground">Leave markers</span> · Lisa Green (on leave), Luca
          Bianchi (training). Draft and Confirmed badges are shown in the grid.
        </div>
      </div>
    </AppShell>
  );
}
