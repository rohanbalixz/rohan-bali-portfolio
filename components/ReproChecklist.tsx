interface ChecklistItem {
  label: string;
  status: 'yes' | 'partial' | 'no';
  detail?: string;
}

const statusMark: Record<ChecklistItem['status'], string> = {
  yes: '✓',
  partial: '◐',
  no: '○',
};

const statusColor: Record<ChecklistItem['status'], string> = {
  yes: 'text-success',
  partial: 'text-secondary',
  no: 'text-subtle',
};

interface ReproChecklistProps {
  items: ChecklistItem[];
}

export default function ReproChecklist({ items }: ReproChecklistProps) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {items.map((item, i) => (
        <li
          key={i}
          className="py-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm"
        >
          <span
            className={`font-mono text-base ${statusColor[item.status]}`}
            aria-label={item.status}
          >
            {statusMark[item.status]}
          </span>
          <span className="text-ink sm:min-w-[180px]">
            {item.label}
          </span>
          {item.detail && (
            <span className="text-muted text-xs leading-relaxed basis-full sm:basis-auto sm:flex-1 pl-7 sm:pl-0">
              {item.detail}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
