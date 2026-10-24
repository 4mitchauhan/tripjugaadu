import { redirect } from 'next/navigation';

export default async function StayRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/stay/${id}`);
}
