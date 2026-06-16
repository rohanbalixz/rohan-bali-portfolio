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
  const valueColor = tone === 'secondary' ? 'text-muted' : 'text-ink';
  return (
    <div className="border-t border-ink/80 pt-4">
      <p className={`font-serif ${valueColor} text-4xl md:text-5xl tabular leading-none tracking-[-0.02em]`}>
        {value}
        {unit && (
          <span className="text-xl md:text-2xl text-subtle ml-1">{unit}</span>
        )}
      </p>
      <p className="mt-4 text-sm text-muted leading-relaxed max-w-[28ch]">
        {description}
      </p>
    </div>
  );
}
