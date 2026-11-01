import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 px-6 h-12 text-sm font-medium tracking-wide transition-all duration-300 ease-[var(--ease-out-expo)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-nexus-500 text-white hover:bg-nexus-400 shadow-[0_0_0_0_rgba(227,23,43,0)] hover:shadow-[0_8px_32px_-8px_rgba(227,23,43,0.55)]",
  secondary: "border border-line-strong text-paper hover:border-paper hover:bg-white/[0.03]",
  ghost: "text-steel-300 hover:text-paper px-0",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Botón-enlace. Para enlaces externos pasa target="_blank" (se añade rel seguro). */
export function ButtonLink({ variant = "primary", arrow = false, className, children, target, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={buttonClass(variant, className)}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  arrow?: boolean;
}

export function Button({ variant = "primary", arrow = false, className = "", children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonClass(variant, className)}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
