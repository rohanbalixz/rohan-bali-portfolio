import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <p className="overline mb-4">Page not found</p>
        <h1 className="font-serif text-4xl text-ink tracking-tight mb-6">
          That page does not exist.
        </h1>
        <p className="text-base text-muted leading-relaxed mb-8">
          It may have moved. These are the places most people are looking for:
        </p>
        <p className="text-base flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="link-inline">Home</Link>
          <Link href="/publications" className="link-inline">Publications</Link>
          <Link href="/research" className="link-inline">Research</Link>
          <Link href="/cv" className="link-inline">CV</Link>
        </p>
      </div>
    </div>
  );
}
