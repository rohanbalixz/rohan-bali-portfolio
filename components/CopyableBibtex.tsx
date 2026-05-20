'use client';

import { useState } from 'react';

interface CopyableBibtexProps {
  bibtex: string;
}

export default function CopyableBibtex({ bibtex }: CopyableBibtexProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard failed silently — user can still copy by selecting text
    }
  };

  return (
    <div className="relative">
      <pre className="bg-code-bg border border-rule rounded-2xl text-ink p-5 pr-14 overflow-x-auto text-xs font-mono leading-relaxed">
        {bibtex}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-rule bg-surface text-muted hover:text-accent hover:border-accent transition-colors rounded-md"
        aria-label={copied ? 'Copied' : 'Copy BibTeX'}
      >
        {copied ? (
          <>
            <span className="text-success" aria-hidden="true">
              ✓
            </span>
            Copied
          </>
        ) : (
          'Copy'
        )}
      </button>
    </div>
  );
}
