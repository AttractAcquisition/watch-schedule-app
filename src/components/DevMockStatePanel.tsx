import { useEffect, useState } from "react";
import { getAuthState, setMockState, subscribeAuth, type MockState } from "@/lib/authPlaceholder";
import { PLAN_LABEL } from "@/lib/constants";
import type { PlanType } from "@/lib/types";

const OPTIONS: { id: MockState; label: string }[] = [
  { id: "logged_out", label: "Logged out" },
  { id: "logged_in_unpaid", label: "Logged in · unpaid" },
  { id: "logged_in_paid_new", label: "Logged in · paid · new user" },
  { id: "logged_in_paid_onboarded", label: "Logged in · paid · onboarded" },
];

export function DevMockStatePanel({ compact = false }: { compact?: boolean }) {
  const [auth, setAuth] = useState(getAuthState());
  const [plan, setPlan] = useState<PlanType>("triple_watch");
  useEffect(() => subscribeAuth(setAuth), []);

  return (
    <div className={"panel " + (compact ? "p-4" : "p-5")}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Development only - remove before production
        </div>
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          frontend only
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Switch between auth, payment, onboarding, and plan states for testing the frontend gate.
        Replaced with real Supabase and Stripe state later.
      </p>
      <div className="mt-3 grid gap-2 text-xs md:grid-cols-3">
        <button
          className={
            "rounded-md border px-3 py-2 text-left " +
            (auth.isAuthenticated
              ? "border-foreground bg-secondary/40"
              : "border-border text-muted-foreground")
          }
          onClick={() => setMockState(auth.isAuthenticated ? "logged_out" : "logged_in_unpaid")}
        >
          Authenticated / not authenticated
        </button>
        <button
          className={
            "rounded-md border px-3 py-2 text-left " +
            (auth.subscriptionStatus === "active"
              ? "border-foreground bg-secondary/40"
              : "border-border text-muted-foreground")
          }
          onClick={() =>
            setMockState(
              auth.subscriptionStatus === "active" ? "logged_in_unpaid" : "logged_in_paid_new",
            )
          }
        >
          Paid / unpaid
        </button>
        <button
          className={
            "rounded-md border px-3 py-2 text-left " +
            (auth.hasCompletedOnboarding
              ? "border-foreground bg-secondary/40"
              : "border-border text-muted-foreground")
          }
          onClick={() =>
            setMockState(
              auth.hasCompletedOnboarding ? "logged_in_paid_new" : "logged_in_paid_onboarded",
            )
          }
        >
          Onboarding complete / incomplete
        </button>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => setMockState(o.id)}
            className={
              "rounded-md border px-3 py-2 text-left text-xs " +
              (auth.mockState === o.id
                ? "border-foreground bg-secondary/40"
                : "border-border text-muted-foreground hover:bg-secondary/30")
            }
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {(["solo_watch", "dual_watch", "triple_watch"] as PlanType[]).map((p) => (
          <button
            key={p}
            onClick={() => setPlan(p)}
            className={
              "rounded-md border px-3 py-2 text-left text-xs " +
              (plan === p
                ? "border-foreground bg-secondary/40"
                : "border-border text-muted-foreground hover:bg-secondary/30")
            }
          >
            {PLAN_LABEL[p]}
          </button>
        ))}
      </div>
      <div className="mt-3 font-mono text-[10px] text-muted-foreground">
        {"{{USER_EMAIL}} {{SUPABASE_USER_ID}} {{STRIPE_CUSTOMER_ID}}"} · mock plan:{" "}
        {PLAN_LABEL[plan]}
      </div>
    </div>
  );
}
