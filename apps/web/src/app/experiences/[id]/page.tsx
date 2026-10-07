import { redirect } from 'next/navigation';

export default async function ExperienceRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/experience/${id}`);
}
