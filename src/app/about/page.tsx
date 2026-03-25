export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <section className="space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://raw.githubusercontent.com/RapidRiseAi/onyx-details-website/main/Premium-Service-Promise.png"
          alt="Onyx Details service promise"
          className="aspect-video w-full rounded-xl object-cover"
        />
        <h1 className="text-3xl font-bold">About</h1>
      </section>

      <p className="text-zinc-300">Onyx Details delivers premium mobile detailing at homes, farms, and workplaces.</p>
      <p className="text-zinc-300">Our focus is simple: consistent quality, professional communication, and reliable service that saves our clients time.</p>
      <p className="text-zinc-300">We built our process to make regular detailing practical, not stressful—from booking through to finished result.</p>
    </div>
  );
}
