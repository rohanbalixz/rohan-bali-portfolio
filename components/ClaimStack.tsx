interface Claim {
  n: number;
  claim: string;
  evidence: React.ReactNode;
}

export default function ClaimStack({ claims }: { claims: Claim[] }) {
  return (
    <ol className="list-decimal pl-6 space-y-3">
      {claims.map((c) => (
        <li key={c.n}>
          <strong>{c.claim}</strong> {c.evidence}
        </li>
      ))}
    </ol>
  );
}
