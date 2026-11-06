interface ChecklistItem {
  label: string;
  status: 'yes' | 'partial' | 'no';
  detail?: string;
}

const line = (i: ChecklistItem) => (i.detail ? `${i.label} (${i.detail})` : i.label);

export default function ReproChecklist({ items }: { items: ChecklistItem[] }) {
  const ready = items.filter((i) => i.status === 'yes');
  const pending = items.filter((i) => i.status !== 'yes');
  return (
    <div className="space-y-3">
      <p>
        <strong>In the repository:</strong> {ready.map(line).join('; ')}.
      </p>
      {pending.length > 0 && (
        <p>
          <strong>Not yet:</strong> {pending.map(line).join('; ')}.
        </p>
      )}
    </div>
  );
}
