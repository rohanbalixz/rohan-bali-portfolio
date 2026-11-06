interface MetricCardProps {
  value: string;
  unit?: string;
  description: string;
  tone?: 'accent' | 'secondary';
}

// A key number with its meaning, rendered as a plain bullet point.
export default function MetricCard({ value, unit, description }: MetricCardProps) {
  return (
    <li>
      <strong className="tabular">
        {value}
        {unit}
      </strong>{' '}
      {description}
    </li>
  );
}
