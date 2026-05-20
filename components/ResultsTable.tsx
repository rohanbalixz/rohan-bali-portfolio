interface ResultsTableProps {
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
  highlightRow?: number;
}

export default function ResultsTable({
  caption,
  headers,
  rows,
  highlightRow,
}: ResultsTableProps) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto border border-rule rounded-2xl">
        <table className="w-full text-sm tabular border-collapse">
          <thead>
            <tr className="border-b border-rule bg-paper">
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-4 py-3 font-mono text-xs uppercase tracking-wider text-subtle whitespace-nowrap ${
                    i === 0 ? 'text-left' : 'text-right'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-rule last:border-b-0 ${
                  ri === highlightRow ? 'bg-accent/5' : ''
                }`}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-3 ${
                      ci === 0
                        ? 'text-ink font-medium'
                        : 'text-muted text-right whitespace-nowrap'
                    } ${ri === highlightRow ? 'text-ink' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs font-mono text-subtle leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
