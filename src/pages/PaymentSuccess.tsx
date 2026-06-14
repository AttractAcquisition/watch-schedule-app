import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

// Show the spinner UI for this long before surfacing the manual button.
const SHOW_BUTTON_AFTER_MS = 20_000;
// Poll interval while waiting.
const POLL_INTERVAL_MS = 3_000;

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { isPaid, refreshAppState } = useAuth();
  const [showButton, setShowButton] = useState(false);
  const [continuing, setContinuing] = useState(false);
  const mountedAt = useRef(Date.now());
  const pollHandle = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Navigate as soon as the Realtime listener or polling detects the
  // subscription becoming active.
  useEffect(() => {
    if (isPaid) {
      navigate("/", { replace: true });
    }
  }, [isPaid, navigate]);

  // Keep polling in the background even after the button appears — the webhook
  // may just be slow.
  useEffect(() => {
    if (isPaid) return;

    async function poll() {
      await refreshAppState();
      if (Date.now() - mountedAt.current > SHOW_BUTTON_AFTER_MS) {
        setShowButton(true);
      }
      pollHandle.current = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      if (pollHandle.current) clearTimeout(pollHandle.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount; isPaid change is handled by the effect above

  async function handleContinue() {
    setContinuing(true);
    // One final refresh — the webhook may have fired while the user was reading.
    await refreshAppState();
    // Navigate to root; IndexRedirect will route to /onboarding if now paid,
    // or /payment-required if truly unpaid.
    navigate("/", { replace: true });
  }

  if (showButton) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="panel max-w-md p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border">
            <Check className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-xl font-semibold tracking-tight">Payment received</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment was successful. Click below to continue to vessel setup.
          </p>
          <Button className="mt-6 w-full" disabled={continuing} onClick={handleContinue}>
            {continuing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Activating…
              </span>
            ) : (
              "Continue to vessel setup"
            )}
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Still activating in the background — the page will advance automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="panel max-w-md p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border">
          <Check className="h-5 w-5" />
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight">Payment successful</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Activating your subscription — this only takes a moment.
        </p>
        <div className="mt-6 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
