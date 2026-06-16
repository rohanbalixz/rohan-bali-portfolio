interface PipelineDiagramProps {
  steps: { label: string; detail?: string }[];
  caption?: string;
}

export default function PipelineDiagram({
  steps,
  caption,
}: PipelineDiagramProps) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto -mx-2 px-2">
        <ol className="flex items-stretch gap-2 min-w-max">
          {steps.map((s, i) => (
            <li key={i} className="flex items-stretch gap-2">
              <div className="flex flex-col items-start justify-between border border-rule bg-surface px-4 py-3 min-w-[140px]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-subtle leading-none mb-2">
                  Step {String(i + 1).padStart(2, '0')}
                </p>
                <p className="font-serif text-sm text-ink leading-snug">
                  {s.label}
                </p>
                {s.detail && (
                  <p className="font-mono text-[10px] uppercase tracking-wider text-subtle mt-2 leading-relaxed">
                    {s.detail}
                  </p>
                )}
              </div>
              {i < steps.length - 1 && (
                <span
                  className="flex items-center text-accent font-mono text-lg select-none"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      {caption && (
        <figcaption className="mt-4 text-xs font-mono text-subtle leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
