import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30000;

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { isPaid, refreshAppState } = useAuth();
  const [timedOut, setTimedOut] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (isPaid) {
      navigate("/", { replace: true });
      return;
    }

    let handle: ReturnType<typeof setTimeout>;

    async function poll() {
      if (Date.now() - startedAt.current > POLL_TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }
      await refreshAppState();
      handle = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => clearTimeout(handle);
  }, [isPaid, navigate, refreshAppState]);

  if (timedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="panel max-w-md p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border">
            <Check className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-xl font-semibold tracking-tight">Payment received</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment was successful. If the app hasn't updated yet, click below to continue.
          </p>
          <Button className="mt-6 w-full" onClick={() => navigate("/", { replace: true })}>
            Continue to setup
          </Button>
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
          Activating your subscription — this takes just a moment.
        </p>
        <div className="mt-6 flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
