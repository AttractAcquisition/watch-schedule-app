// Watch Schedule — Stripe placeholders.
// TODO: call real Stripe checkout session endpoint via server function.

import type { PlanType, SubscriptionStatus } from "./types";
import { setMockState } from "./authPlaceholder";

export async function getSubscriptionStatus(_userId: string): Promise<SubscriptionStatus> {
  // TODO: read subscription from Supabase / Stripe
  return "active";
}

export async function mockCreateCheckoutSession(planId: PlanType) {
  // TODO: Replace with Stripe Checkout
  console.info("[stripe placeholder] mockCreateCheckoutSession", planId);
  // Simulate successful payment for the demo flow:
  setTimeout(() => setMockState("logged_in_paid_new"), 600);
  return { url: "/payment-success" };
}

export async function mockOpenCustomerPortal() {
  // TODO: Replace with Stripe Checkout
  console.info("[stripe placeholder] mockOpenCustomerPortal");
  return { url: "#" };
}

export const createStripeCheckoutSession = mockCreateCheckoutSession;
export const openStripeCustomerPortal = mockOpenCustomerPortal;
