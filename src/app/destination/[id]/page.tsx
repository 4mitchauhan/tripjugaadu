import { notFound } from 'next/navigation';
import { DESTINATIONS, ADVENTURES, STAYS } from '@/lib/data';
import DestinationClient from '@/components/DestinationClient';

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({
    id: d.id,
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dest = DESTINATIONS.find((d) => d.id.toLowerCase() === id.toLowerCase()) || DESTINATIONS[0];

  if (!dest) {
    notFound();
  }

  // Filter adventures & stays in this location
  const relatedAdventures = ADVENTURES.filter(
    (a) => a.location.toLowerCase().includes(dest.name.toLowerCase()) || dest.name.toLowerCase().includes(a.location.toLowerCase())
  );
  const displayAdventures = relatedAdventures.length > 0 ? relatedAdventures : ADVENTURES.slice(0, 3);

  const relatedStays = STAYS.filter(
    (s) => s.location.toLowerCase().includes(dest.name.toLowerCase()) || dest.name.toLowerCase().includes(s.location.toLowerCase())
  );
  const displayStays = relatedStays.length > 0 ? relatedStays : STAYS.slice(0, 2);

  return (
    <DestinationClient
      dest={dest}
      adventures={displayAdventures}
      stays={displayStays}
    />
  );
}
