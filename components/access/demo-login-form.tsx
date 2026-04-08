"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type DemoLoginFormProps = {
  action: (state: DemoLoginState, formData: FormData) => Promise<DemoLoginState>;
  nextPath: string;
  isConfigured: boolean;
};

type DemoLoginState = {
  error: string | null;
};

const initialDemoLoginState: DemoLoginState = {
  error: null,
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={disabled || pending} className="soft-button w-full">
      {pending ? "Kontrol ediliyor..." : "Demo Girisini Ac"}
    </button>
  );
}

export function DemoLoginForm({ action, nextPath, isConfigured }: DemoLoginFormProps) {
  const [state, formAction] = useActionState(action, initialDemoLoginState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-espresso">Demo sifresi</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Sifre"
          disabled={!isConfigured}
          className="field"
        />
      </label>

      {state.error ? (
        <div className="rounded-[20px] border border-rosewood/15 bg-[#fff4f4] px-4 py-3 text-sm text-rosewood">
          {state.error}
        </div>
      ) : null}

      {!isConfigured ? (
        <div className="rounded-[20px] border border-[#e6dccf] bg-[#fffaf5] px-4 py-3 text-sm text-[#7d6660]">
          Demo sifresi tanimli degil. Deploy oncesi `DEMO_ACCESS_PASSWORD` ve
          `DEMO_SESSION_SECRET` env degerlerini ekleyin.
        </div>
      ) : null}

      <SubmitButton disabled={!isConfigured} />
    </form>
  );
}
