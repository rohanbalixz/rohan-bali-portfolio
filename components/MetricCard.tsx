interface MetricCardProps {
  value: string;
  unit?: string;
  description: string;
  tone?: 'accent' | 'secondary';
}

export default function MetricCard({
  value,
  unit,
  description,
  tone = 'accent',
}: MetricCardProps) {
  const valueColor = tone === 'secondary' ? 'text-secondary' : 'text-ink';
  return (
    <div className="border border-rule rounded-2xl bg-surface p-6 card-lift">
      <p className={`font-serif font-medium ${valueColor} text-4xl md:text-5xl tabular leading-none tracking-[-0.025em]`}>
        {value}
        {unit && (
          <span className="text-xl md:text-2xl text-muted ml-1.5">{unit}</span>
        )}
      </p>
      <p className="mt-5 text-sm text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
