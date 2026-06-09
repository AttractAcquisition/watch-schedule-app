import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { DevMockStatePanel } from "@/components/DevMockStatePanel";

export default function Signup() {
  return (
    <>
      <AuthCard
        title="Create your Watch Schedule account"
        subtitle="Payment and vessel setup will follow after account creation."
      >
        <SignupForm />
      </AuthCard>
      <div className="mx-auto -mt-8 mb-12 w-full max-w-md px-4">
        <DevMockStatePanel compact />
      </div>
    </>
  );
}
