import Disclaimer from '@/components/Disclaimer';

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 lg:p-12 bg-slate-900 text-white">
      <div className="w-full max-w-6xl space-y-8">
        <Disclaimer />
        {children}
      </div>
    </section>
  );
}
