import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openStripeCustomerPortal } from "@/lib/stripePlaceholder";
import { DevMockStatePanel } from "@/components/DevMockStatePanel";
import { toast } from "sonner";
import { MOCK_VESSEL } from "@/lib/mockData";
import { signOut } from "@/lib/authPlaceholder";

const ROLES = ["Captain/Admin", "Officer", "Department Head", "Crew Member", "Viewer"];
const BACKEND_CHECKLIST = [
  "Supabase project connected",
  "Auth enabled",
  "Profiles table created",
  "Vessels table created",
  "Crew table created",
  "Watch templates table created",
  "Schedule runs table created",
  "Schedule assignments table created",
  "Charter pauses table created",
  "Leave records table created",
  "Audit logs table created",
  "RLS policies enabled",
  "Stripe checkout connected",
  "Stripe webhook connected",
  "PDF export connected",
  "OCR / crew extraction connected",
  "Schedule generation Edge Function connected",
];

export default function Settings() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings"
        title="Account, vessel & billing"
        description="Manage account, vessel profile, plan, and role-based access. Real backend integration pending."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Account
          </div>
          <div className="mt-4 grid gap-3">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input defaultValue="Captain James Carter" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="captain@meridian.yacht" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue="Captain/Admin" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => toast("Account saved (mock).")}>Save account</Button>
              <Button variant="outline" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Vessel
          </div>
          <div className="mt-4 grid gap-3">
            <div className="space-y-2">
              <Label>Vessel name</Label>
              <Input defaultValue={MOCK_VESSEL.name} />
            </div>
            <div className="space-y-2">
              <Label>Vessel length</Label>
              <Input defaultValue={`${MOCK_VESSEL.lengthMeters}m`} />
            </div>
            <div className="space-y-2">
              <Label>Operation type</Label>
              <Input defaultValue="Private/Charter" />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input defaultValue={MOCK_VESSEL.timezone} />
            </div>
            <Button className="self-start" onClick={() => toast("Vessel saved (mock).")}>
              Save vessel
            </Button>
          </div>
        </div>

        <div className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Plan &amp; billing
          </div>
          <div className="mt-3 text-sm">
            Current plan: <span className="font-medium">Triple Watch</span> · Subscription status:
            Active
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Billing email: captain@meridian.yacht · {"{{STRIPE_CUSTOMER_ID}}"}
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={async () => {
              await openStripeCustomerPortal(); // TODO: real Stripe portal
              toast("Stripe customer portal placeholder.");
            }}
          >
            Manage billing
          </Button>
          <div className="mt-3 font-mono text-[10px] text-muted-foreground">
            TODO: connect Stripe Customer Portal
          </div>
        </div>

        <div className="panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Roles &amp; access
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {ROLES.map((r) => (
              <div
                key={r}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2"
              >
                <span>{r}</span>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Placeholder
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Security note
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Crew and vessel data will be protected through authenticated access and vessel-level
            permissions once Supabase is connected.
          </p>
        </div>

        <div className="lg:col-span-2 panel p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Backend Setup Checklist
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {BACKEND_CHECKLIST.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground"
              >
                <input type="checkbox" className="accent-white" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <DevMockStatePanel />
        </div>
      </div>
    </AppShell>
  );
}
