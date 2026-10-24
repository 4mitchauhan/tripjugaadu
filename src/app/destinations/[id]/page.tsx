import { redirect } from 'next/navigation';

export default async function DestinationRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/destination/${id}`);
}
