interface ConceptPlaceholderProps {
  routeLabel: string;
  /** True only for genuinely unbuilt concepts — a Live system with no captured screenshot
   *  gets an honest "no screenshot" label instead, never "not yet built". */
  isConcept: boolean;
}

/** Plain, honest stand-in for a system with no real screenshot yet — a bordered panel
 *  with the route label and nothing invented, not a fake dashboard mockup. */
export default function ConceptPlaceholder({ routeLabel, isConcept }: ConceptPlaceholderProps) {
  return (
    <div
      className="flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-dashed"
      style={{ borderColor: 'var(--line-strong)', background: 'var(--paper-050)' }}
      aria-hidden="true"
    >
      <span className="eyebrow">{isConcept ? 'Concept — Not Yet Built' : 'No Screenshot Available'}</span>
      <span className="meta-index normal-case" style={{ color: 'var(--ink-400)' }}>
        {routeLabel}
      </span>
    </div>
  );
}
