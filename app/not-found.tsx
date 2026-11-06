import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-5 pt-8">
      <div>
                <h1 className="text-[32px] leading-tight mb-4">
          That page does not exist.
        </h1>
        <p className="leading-relaxed mb-4">
          It may have moved. These are the places most people are looking for:
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className="link-inline">Home</Link>
          <Link href="/publications" className="link-inline">Publications</Link>
          <Link href="/research" className="link-inline">Research</Link>
          <Link href="/cv" className="link-inline">CV</Link>
        </p>
      </div>
    </div>
  );
}
