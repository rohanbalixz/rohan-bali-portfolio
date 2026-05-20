interface Claim {
  n: number;
  claim: string;
  evidence: React.ReactNode;
}

interface ClaimStackProps {
  claims: Claim[];
}

export default function ClaimStack({ claims }: ClaimStackProps) {
  return (
    <ol className="space-y-6">
      {claims.map((c) => (
        <li
          key={c.n}
          className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 border border-rule bg-white p-5 rounded-2xl card-lift"
        >
          <div className="font-serif text-3xl text-accent tabular leading-none">
            {String(c.n).padStart(2, '0')}
          </div>
          <div>
            <p className="overline mb-2">Claim {c.n}</p>
            <p className="font-serif text-lg text-ink leading-snug mb-3 text-pretty">
              {c.claim}
            </p>
            <div className="text-sm text-muted leading-relaxed">
              <span className="overline mr-2">Evidence</span>
              <span>{c.evidence}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
