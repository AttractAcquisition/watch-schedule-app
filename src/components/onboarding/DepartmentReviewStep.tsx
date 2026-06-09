import { MOCK_CREW } from "@/lib/mockData";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DepartmentReviewStep() {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Position</th>
            <th className="px-4 py-3 font-medium">Suggested department</th>
            <th className="px-4 py-3 font-medium">Watch eligible</th>
            <th className="px-4 py-3 font-medium">Eligible roles</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {MOCK_CREW.map((c) => (
            <tr key={c.id} className="border-b border-border/60 last:border-0">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{c.position}</td>
              <td className="px-4 py-2">
                <Select defaultValue={c.department}>
                  <SelectTrigger className="h-8 w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="command">Command</SelectItem>
                    <SelectItem value="deck">Deck</SelectItem>
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </td>
              <td className="px-4 py-2">
                <Switch defaultChecked={c.watchEligible} />
              </td>
              <td className="px-4 py-2 text-xs text-muted-foreground">
                {c.eligibleRoles.length
                  ? c.eligibleRoles.map((role) => (
                      <span
                        key={role}
                        className="mr-1 inline-flex rounded border border-border px-1.5 py-0.5"
                      >
                        {role.replace(/_/g, " ")}
                      </span>
                    ))
                  : "Not assigned"}
              </td>
              <td className="px-4 py-2 text-right text-xs text-muted-foreground">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
