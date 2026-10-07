import { redirect } from 'next/navigation';

export default async function AdventureRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/adventure/${id}`);
}
