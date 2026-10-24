import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Activity, Users } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-3xl">
        <div className="section__header reveal mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase text-[var(--color-accent)] mb-4 hover:underline">
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <span className="badge mb-2">Your Safety Matters</span>
          <h1 className="section__title">Safety & Protocols</h1>
          <p className="section__subtitle max-w-xl">
            TripJugaadu mandates rigorous safety standards for all adventure activities and partner operators.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={20} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-white text-lg uppercase tracking-wider">Operator Verification</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Every operator on TripJugaadu undergoes a multi-step verification process including PAN verification, Tourism Board licensing checks, insurance validation, and periodic safety audits. Only operators with verified credentials can list services on the marketplace.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <Activity size={20} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-white text-lg uppercase tracking-wider">Activity Safety Standards</h3>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)] list-disc list-inside">
              <li>All rafting and water activities require certified life jackets and trained rescue personnel.</li>
              <li>Bungee jumping operations must hold ISO 9001 certification and undergo monthly equipment inspections.</li>
              <li>Trekking guides must be certified with basic life support (BLS) training.</li>
              <li>All adventure activities carry comprehensive third-party liability insurance.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-[var(--color-accent)]" />
              <h3 className="font-bold text-white text-lg uppercase tracking-wider">Traveler Responsibilities</h3>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)] list-disc list-inside">
              <li>Carry a valid government-issued photo ID at all times.</li>
              <li>Disclose any medical conditions that may affect activity participation.</li>
              <li>Follow all instructions from certified activity guides and operators.</li>
              <li>Ensure you meet the minimum age and fitness requirements for each activity.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
