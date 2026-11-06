interface ResultsTableProps {
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
  highlightRow?: number;
}

export default function ResultsTable({ caption, headers, rows, highlightRow }: ResultsTableProps) {
  return (
    <figure className="my-7 not-prose">
      <div className="overflow-x-auto">
        <table className="w-full text-[15px] tabular border-collapse border-y-2 border-ink/70">
          <thead>
            <tr className="border-b border-ink/40">
              {headers.map((h, i) => (
                <th key={i} scope="col" className={`px-3 py-1.5 font-bold whitespace-nowrap ${i === 0 ? 'text-left' : 'text-right'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-3 py-1 ${ci === 0 ? 'text-left' : 'text-right whitespace-nowrap'} ${ri === highlightRow ? 'font-bold' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-2 text-sm text-muted leading-normal">{caption}</figcaption>}
    </figure>
  );
}
