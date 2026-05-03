import React, { useState } from 'react';
import {
  Zap, BarChart3, Users, ShieldCheck, Cpu, Globe,
  Mail, Search, Eye, EyeOff, ArrowRight, Download,
  Plus, Settings, Bell, Star, Heart, Bookmark,
  CheckCircle2, Clock, XCircle,
} from 'lucide-react';

import { Button }        from '../components/ui/Button';
import { Badge }         from '../components/ui/Badge';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Toggle, Checkbox } from '../components/ui/Toggle';
import { Avatar, AvatarGroup } from '../components/ui/Avatar';
import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Spinner }       from '../components/ui/Spinner';
import { ProgressBar }   from '../components/ui/ProgressBar';
import { Skeleton, SkeletonCard } from '../components/ui/Skeleton';
import { Tabs }          from '../components/ui/Tabs';
import { Breadcrumb }    from '../components/ui/Breadcrumb';
import { Alert }         from '../components/ui/Alert';
import { Modal }         from '../components/ui/Modal';
import { StatCard }      from '../components/ui/StatCard';
import { Table }         from '../components/ui/Table';
import { Tooltip }       from '../components/ui/Tooltip';
import { useToast }      from '../components/ui/Toast';

/* ─── Section wrapper ───────────────────────────────────────────────────── */
function Section({ id, title, description, children }: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
        {description && (
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function DemoBox({ label, children, className = '' }: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--color-text-tertiary)' }}>
          {label}
        </p>
      )}
      <div className={[
        'rounded-lg border border-[var(--color-border)] p-5',
        className,
      ].join(' ')}
           style={{ backgroundColor: 'var(--color-bg)' }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Color swatch ──────────────────────────────────────────────────────── */
function Swatch({ hex, name, token }: { hex: string; name: string; token: string }) {
  return (
    <div className="space-y-1.5">
      <div
        className="w-full h-10 rounded-md border border-black/10 dark:border-white/10"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{name}</p>
        <p className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{hex}</p>
        <p className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{token}</p>
      </div>
    </div>
  );
}

/* ─── Table sample data ─────────────────────────────────────────────────── */
type UserRow = { name: string; role: string; status: string; joined: string; score: number };

const tableData: UserRow[] = [
  { name: 'Sarah Chen',    role: 'Product Manager', status: 'Active',   joined: 'Jan 2024', score: 94 },
  { name: 'Marcus Rivera', role: 'AI Engineer',     status: 'Active',   joined: 'Feb 2024', score: 88 },
  { name: 'Aisha Thompson',role: 'Data Scientist',  status: 'Pending',  joined: 'Mar 2024', score: 76 },
  { name: 'Jordan Kim',    role: 'UX Designer',     status: 'Active',   joined: 'Jan 2024', score: 91 },
  { name: 'Priya Patel',   role: 'ML Researcher',   status: 'Inactive', joined: 'Apr 2024', score: 62 },
  { name: 'David Okafor',  role: 'Backend Engineer',status: 'Active',   joined: 'Mar 2024', score: 85 },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'neutral'; dot: boolean }> = {
  Active:   { variant: 'success', dot: true },
  Pending:  { variant: 'warning', dot: true },
  Inactive: { variant: 'neutral', dot: true },
};

/* ─── Main ──────────────────────────────────────────────────────────────── */
export function DesignSystem({ darkMode }: { darkMode: boolean }) {
  const toast = useToast();
  const [showPw, setShowPw]       = useState(false);
  const [toggle1, setToggle1]     = useState(true);
  const [toggle2, setToggle2]     = useState(false);
  const [check1, setCheck1]       = useState(true);
  const [check2, setCheck2]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const navSections = [
    { id: 'brand',      label: 'Brand' },
    { id: 'colors',     label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons',    label: 'Buttons' },
    { id: 'forms',      label: 'Forms' },
    { id: 'cards',      label: 'Cards' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'data',       label: 'Data Display' },
    { id: 'feedback',   label: 'Feedback' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
               backgroundSize: '40px 40px',
             }} />
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="flex flex-col items-center text-center gap-6">
            <img src="/AIIP-Logo-Navy-Transparent.png" alt="AI Innovator Pro" className="h-16 brightness-0 invert" />
            <div>
              <h1 className="text-5xl font-bold text-white tracking-tight">Design System</h1>
              <p className="mt-3 text-lg text-white/70 max-w-xl">
                The complete visual language for AI Innovator Pro — tokens, components, and patterns for building consistent, beautiful interfaces.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Badge variant="accent" size="md">v1.0</Badge>
              <Badge variant="neutral" size="md">React + TypeScript</Badge>
              <Badge variant="neutral" size="md">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10 items-start">

          {/* ── Sticky sidebar nav ─────────────────────────────────────── */}
          <aside className="hidden xl:block w-52 shrink-0 sticky top-24 space-y-1">
            {navSections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-1.5 rounded text-sm font-medium transition-fast hover:bg-neutral-100 dark:hover:bg-neutral-800"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {s.label}
              </a>
            ))}
          </aside>

          {/* ── Main content ────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* ── Brand Assets ─────────────────────────────────────────── */}
            <Section id="brand" title="Brand Assets" description="Official logos and usage guidelines for AI Innovator Pro.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <DemoBox label="Primary — Navy on White">
                  <div className="flex items-center justify-center py-6 bg-white rounded-md border border-neutral-200">
                    <img src="/AIIP-Logo-Navy-on-White.png" alt="AIIP Navy on White" className="h-16 w-auto" />
                  </div>
                </DemoBox>
                <DemoBox label="Transparent — Dark Backgrounds">
                  <div className="flex items-center justify-center py-6 bg-navy-800 rounded-md">
                    <img src="/AIIP-Logo-Navy-Transparent.png" alt="AIIP on Dark" className="h-16 w-auto brightness-0 invert" />
                  </div>
                </DemoBox>
                <DemoBox label="Banner — 800x200">
                  <img src="/AIIP-Banner-800x200.png" alt="AIIP Banner" className="w-full rounded-md" />
                </DemoBox>
                <DemoBox label="Favicon / App Icon">
                  <div className="flex items-center gap-5 py-4">
                    <img src="/AIIP-Favicon-512x512.png" alt="AIIP Favicon 64" className="w-16 h-16 rounded-xl" />
                    <img src="/AIIP-Favicon-512x512.png" alt="AIIP Favicon 48" className="w-12 h-12 rounded-lg" />
                    <img src="/AIIP-Favicon-512x512.png" alt="AIIP Favicon 32" className="w-8 h-8 rounded-md" />
                    <img src="/AIIP-Favicon-512x512.png" alt="AIIP Favicon 20" className="w-5 h-5 rounded" />
                  </div>
                </DemoBox>
              </div>
            </Section>

            {/* ── Colors ───────────────────────────────────────────────── */}
            <Section id="colors" title="Color System" description="A 6-ramp palette anchored in AIIP brand navy with semantic tokens for every use case.">
              <DemoBox label="Primary — Navy">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {[
                    ['#EEF2F9','50','navy-50'],['#D5E0EF','100','navy-100'],['#AABFDF','200','navy-200'],
                    ['#7D9ECF','300','navy-300'],['#507DBF','400','navy-400'],['#2E5CA8','500','navy-500'],
                    ['#1B3A6B','600','navy-600'],['#163060','700','navy-700'],['#102347','800','navy-800'],
                    ['#0A172E','900','navy-900'],
                  ].map(([hex, name, token]) => <Swatch key={name} hex={hex} name={name} token={token} />)}
                </div>
              </DemoBox>

              <DemoBox label="Accent — Steel Cyan">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {[
                    ['#ECFBFF','50','cyan-50'],['#CFF4FE','100','cyan-100'],['#A3EBFD','200','cyan-200'],
                    ['#63DDFB','300','cyan-300'],['#1AC8F5','400','cyan-400'],['#0AADD6','500','cyan-500'],
                    ['#0C8AAF','600','cyan-600'],['#106E8C','700','cyan-700'],['#125972','800','cyan-800'],
                    ['#134A5F','900','cyan-900'],
                  ].map(([hex, name, token]) => <Swatch key={name} hex={hex} name={name} token={token} />)}
                </div>
              </DemoBox>

              <DemoBox label="Semantic Colors">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Success</p>
                    <Swatch hex="#22C55E" name="500" token="success-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Warning</p>
                    <Swatch hex="#F59E0B" name="500" token="warning-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Danger</p>
                    <Swatch hex="#EF4444" name="500" token="danger-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Info</p>
                    <Swatch hex="#3B82F6" name="500" token="info-500" />
                  </div>
                </div>
              </DemoBox>

              <DemoBox label="Gradients">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'gradient-navy',  from: '#1B3A6B', to: '#2E5CA8', cls: 'gradient-navy' },
                    { label: 'gradient-accent', from: '#0AADD6', to: '#1AC8F5', cls: 'gradient-accent' },
                    { label: 'gradient-brand',  from: '#1B3A6B', to: '#0AADD6', cls: 'gradient-brand' },
                  ].map(g => (
                    <div key={g.label}>
                      <div className={`h-12 rounded-md ${g.cls}`} />
                      <p className="mt-1.5 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>.{g.label}</p>
                    </div>
                  ))}
                </div>
              </DemoBox>
            </Section>

            {/* ── Typography ───────────────────────────────────────────── */}
            <Section id="typography" title="Typography" description="Inter font family — 3 weights, full scale from xs to 6xl.">
              <DemoBox>
                <div className="space-y-4">
                  {[
                    { label: 'Display / 6xl', size: 'text-6xl', weight: 'font-bold', text: 'AI Innovator Pro' },
                    { label: 'H1 / 5xl', size: 'text-5xl', weight: 'font-bold', text: 'Build the Future' },
                    { label: 'H2 / 4xl', size: 'text-4xl', weight: 'font-semibold', text: 'Design System' },
                    { label: 'H3 / 3xl', size: 'text-3xl', weight: 'font-semibold', text: 'Component Library' },
                    { label: 'H4 / 2xl', size: 'text-2xl', weight: 'font-semibold', text: 'Color Tokens' },
                    { label: 'H5 / xl', size: 'text-xl', weight: 'font-medium', text: 'Typography Scale' },
                    { label: 'Body Large / lg', size: 'text-lg', weight: 'font-normal', text: 'Consistent interfaces start with a clear type system.' },
                    { label: 'Body / base', size: 'text-base', weight: 'font-normal', text: 'The quick brown fox jumps over the lazy dog.' },
                    { label: 'Small / sm', size: 'text-sm', weight: 'font-normal', text: 'Helper text and secondary information lives here.' },
                    { label: 'Caption / xs', size: 'text-xs', weight: 'font-normal', text: 'Timestamps, labels, and fine print.' },
                  ].map(({ label, size, weight, text }) => (
                    <div key={label} className="flex items-baseline gap-4 pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                      <span className="w-36 shrink-0 text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{label}</span>
                      <span className={`${size} ${weight}`} style={{ color: 'var(--color-text-primary)' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </DemoBox>
            </Section>

            {/* ── Buttons ──────────────────────────────────────────────── */}
            <Section id="buttons" title="Buttons" description="6 variants, 5 sizes, loading state, icon support, and full-width layout.">
              <DemoBox label="Variants">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </DemoBox>

              <DemoBox label="Sizes">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </DemoBox>

              <DemoBox label="States & Icons">
                <div className="flex flex-wrap gap-3">
                  <Button icon={<Plus size={16} />}>Add Item</Button>
                  <Button variant="secondary" icon={<Download size={16} />} iconPosition="right">
                    Export
                  </Button>
                  <Button variant="accent" icon={<ArrowRight size={16} />} iconPosition="right">
                    Continue
                  </Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" icon={<Settings size={16} />} />
                </div>
              </DemoBox>
            </Section>

            {/* ── Forms ────────────────────────────────────────────────── */}
            <Section id="forms" title="Form Controls" description="Inputs, selects, textareas, toggles, and checkboxes with error states.">
              <DemoBox label="Inputs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" placeholder="Jane Doe" fullWidth />
                  <Input label="Email Address" type="email" placeholder="jane@example.com" prefix={<Mail size={15} />} fullWidth />
                  <Input label="Search" placeholder="Search..." prefix={<Search size={15} />} fullWidth />
                  <Input
                    label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter password"
                    suffix={
                      <button onClick={() => setShowPw(v => !v)} className="hover:opacity-70 transition-fast" style={{ color: 'var(--color-text-tertiary)' }}>
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                    fullWidth
                  />
                  <Input label="With Error" placeholder="Invalid field" error="This field is required." fullWidth />
                  <Input label="With Helper" placeholder="Optional field" helper="We'll never share your email." fullWidth />
                </div>
              </DemoBox>

              <DemoBox label="Select & Textarea">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    label="AI Model"
                    placeholder="Choose a model..."
                    options={[
                      { value: 'gpt4', label: 'GPT-4o' },
                      { value: 'claude', label: 'Claude 3.5 Sonnet' },
                      { value: 'gemini', label: 'Gemini 1.5 Pro' },
                    ]}
                    fullWidth
                  />
                  <Select
                    label="With Error"
                    placeholder="Select..."
                    options={[{ value: 'a', label: 'Option A' }]}
                    error="Please select an option."
                    fullWidth
                  />
                  <Textarea label="Description" placeholder="Describe your use case..." rows={4} fullWidth className="sm:col-span-2" />
                </div>
              </DemoBox>

              <DemoBox label="Toggles & Checkboxes">
                <div className="flex flex-wrap gap-8">
                  <div className="space-y-3">
                    <Toggle checked={toggle1} onChange={setToggle1} label="Enable notifications" />
                    <Toggle checked={toggle2} onChange={setToggle2} label="Dark mode" />
                    <Toggle checked size="sm" onChange={() => {}} label="Small toggle" />
                    <Toggle checked={false} disabled onChange={() => {}} label="Disabled" />
                  </div>
                  <div className="space-y-3">
                    <Checkbox checked={check1} onChange={e => setCheck1(e.target.checked)} label="Accept terms" helper="Required to proceed." />
                    <Checkbox checked={check2} onChange={e => setCheck2(e.target.checked)} label="Subscribe to updates" />
                    <Checkbox checked={false} disabled onChange={() => {}} label="Disabled checkbox" />
                  </div>
                </div>
              </DemoBox>
            </Section>

            {/* ── Cards ────────────────────────────────────────────────── */}
            <Section id="cards" title="Cards & Layout" description="Flexible card primitives with optional header, body, and footer slots.">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-100 dark:bg-navy-900/40 flex items-center justify-center text-navy-600 dark:text-navy-300">
                      <Cpu size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>AI Models</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>14 connected</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Manage your AI model integrations and fine-tuning pipelines from a single dashboard.
                  </p>
                </Card>

                <Card hover>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Global Reach</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>42 markets</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Deploy AI-powered solutions across international markets with localization support.
                  </p>
                </Card>

                <Card>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center text-success-600">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Security</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>SOC 2 Type II</p>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Enterprise-grade security with end-to-end encryption and compliance monitoring.
                  </p>
                </Card>
              </div>

              {/* Compound card */}
              <Card padding="none" className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Team Members</h3>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>6 active users</p>
                    </div>
                    <Button size="sm" variant="secondary" icon={<Plus size={14} />}>Invite</Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Chen',    role: 'Product Manager', online: true  },
                      { name: 'Marcus Rivera', role: 'AI Engineer',     online: true  },
                      { name: 'Aisha Thompson',role: 'Data Scientist',  online: false },
                    ].map(u => (
                      <div key={u.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size="sm" online={u.online} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{u.name}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{u.role}</p>
                          </div>
                        </div>
                        <Badge variant={u.online ? 'success' : 'neutral'} size="sm" dot>
                          {u.online ? 'Online' : 'Away'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardBody>
                <CardFooter>
                  <button className="text-sm font-medium transition-fast hover:underline" style={{ color: 'var(--color-accent)' }}>
                    View all members →
                  </button>
                </CardFooter>
              </Card>
            </Section>

            {/* ── Navigation ───────────────────────────────────────────── */}
            <Section id="navigation" title="Navigation" description="Tabs, breadcrumbs, badges and avatar groups.">
              <DemoBox label="Breadcrumb">
                <div className="space-y-3">
                  <Breadcrumb showHome items={[{ label: 'Products' }, { label: 'Design System' }]} />
                  <Breadcrumb items={[{ label: 'Dashboard' }, { label: 'Analytics' }, { label: 'Overview' }]} />
                </div>
              </DemoBox>

              <DemoBox label="Tabs — Underline">
                <Tabs
                  variant="underline"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { id: 'overview', label: 'Overview', badge: 3 },
                    { id: 'models',   label: 'AI Models', icon: <Cpu size={14} /> },
                    { id: 'users',    label: 'Users',    icon: <Users size={14} /> },
                    { id: 'analytics',label: 'Analytics',icon: <BarChart3 size={14} />, disabled: false },
                  ]}
                />
              </DemoBox>

              <DemoBox label="Tabs — Pills">
                <Tabs
                  variant="pills"
                  tabs={[
                    { id: 'all',     label: 'All'     },
                    { id: 'active',  label: 'Active'  },
                    { id: 'draft',   label: 'Draft'   },
                    { id: 'archive', label: 'Archive', disabled: true },
                  ]}
                />
              </DemoBox>

              <DemoBox label="Badges">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="navy">Navy</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="danger"  dot>Critical</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="success" size="sm">Small</Badge>
                  <Badge variant="navy"    size="sm">Small Navy</Badge>
                </div>
              </DemoBox>

              <DemoBox label="Avatars & Groups">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-end gap-3">
                    {(['2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const).map(s => (
                      <Avatar key={s} name="Sarah Chen" size={s} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar name="Marcus Rivera" size="md" online={true} />
                    <Avatar name="Aisha Thompson" size="md" online={false} />
                    <AvatarGroup
                      avatars={[
                        { name: 'Sarah Chen' },
                        { name: 'Marcus Rivera' },
                        { name: 'Aisha Thompson' },
                        { name: 'Jordan Kim' },
                        { name: 'Priya Patel' },
                        { name: 'David Okafor' },
                      ]}
                      max={4}
                    />
                  </div>
                </div>
              </DemoBox>

              <DemoBox label="Tooltips">
                <div className="flex flex-wrap items-center gap-6 py-4">
                  {(['top', 'bottom', 'left', 'right'] as const).map(p => (
                    <Tooltip key={p} content={`Tooltip on ${p}`} placement={p}>
                      <Button size="sm" variant="outline">{p}</Button>
                    </Tooltip>
                  ))}
                  <Tooltip content="Download the design tokens as JSON">
                    <Button size="sm" variant="secondary" icon={<Download size={14} />}>
                      Download
                    </Button>
                  </Tooltip>
                </div>
              </DemoBox>
            </Section>

            {/* ── Data Display ─────────────────────────────────────────── */}
            <Section id="data" title="Data Display" description="Stat cards, data tables, progress bars, and skeleton loaders.">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Active Users"   value="12,483" icon={<Users size={20} />}     trend={8.2}  period="vs last month" color="navy" />
                <StatCard label="AI Requests"    value="1.4M"   icon={<Zap size={20} />}       trend={23.5} period="vs last month" color="accent" />
                <StatCard label="Revenue"        value="$94.2K" icon={<BarChart3 size={20} />} trend={-2.1} period="vs last month" color="success" />
                <StatCard label="Response Time"  value="142ms"  icon={<Cpu size={20} />}       trend={0}    period="no change"    color="warning" />
              </div>

              <DemoBox label="Progress Bars">
                <div className="space-y-4">
                  <ProgressBar value={82}  label="Model Accuracy"  showValue variant="navy"    size="md" />
                  <ProgressBar value={67}  label="API Quota"       showValue variant="accent"  size="md" />
                  <ProgressBar value={94}  label="Uptime"          showValue variant="success" size="sm" />
                  <ProgressBar value={45}  label="Storage"         showValue variant="warning" size="sm" />
                  <ProgressBar value={12}  label="Error Rate"      showValue variant="danger"  size="xs" />
                </div>
              </DemoBox>

              <DemoBox label="Spinners">
                <div className="flex items-center gap-6 flex-wrap">
                  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <Spinner size={s} color="navy" />
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{s}</span>
                    </div>
                  ))}
                  <Spinner size="md" color="accent" />
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-navy-600">
                    <Spinner size="sm" color="white" />
                  </div>
                </div>
              </DemoBox>

              <DemoBox label="Skeleton Loaders">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </DemoBox>

              <DemoBox label="Data Table">
                <Table<UserRow>
                  columns={[
                    {
                      key: 'name',
                      header: 'Name',
                      sortable: true,
                      render: row => (
                        <div className="flex items-center gap-2.5">
                          <Avatar name={row.name} size="sm" />
                          <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{row.name}</span>
                        </div>
                      ),
                    },
                    { key: 'role', header: 'Role', sortable: true },
                    {
                      key: 'status',
                      header: 'Status',
                      render: row => (
                        <Badge
                          variant={statusConfig[row.status].variant}
                          dot={statusConfig[row.status].dot}
                          size="sm"
                        >
                          {row.status}
                        </Badge>
                      ),
                    },
                    { key: 'joined', header: 'Joined', sortable: true },
                    {
                      key: 'score',
                      header: 'Score',
                      sortable: true,
                      align: 'right',
                      render: row => (
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16">
                            <ProgressBar value={row.score} size="xs" variant={row.score >= 85 ? 'success' : row.score >= 70 ? 'accent' : 'warning'} />
                          </div>
                          <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{row.score}</span>
                        </div>
                      ),
                    },
                  ]}
                  data={tableData}
                  pageSize={4}
                />
              </DemoBox>
            </Section>

            {/* ── Feedback ─────────────────────────────────────────────── */}
            <Section id="feedback" title="Feedback & Overlays" description="Alerts, toasts, and modals for communicating state to users.">
              <DemoBox label="Alerts">
                <div className="space-y-3">
                  <Alert variant="success" title="Deployment Successful" dismissible>
                    Your AI model has been deployed to production and is now serving live traffic.
                  </Alert>
                  <Alert variant="warning" title="Rate Limit Approaching" dismissible>
                    You've used 87% of your monthly API quota. Consider upgrading your plan.
                  </Alert>
                  <Alert variant="danger" title="Authentication Failed">
                    Invalid API key. Please check your credentials and try again.
                  </Alert>
                  <Alert variant="info">
                    A new version of the design system (v1.1) is available with updated components.
                  </Alert>
                  <Alert variant="navy" title="Pro Tip">
                    Use the <code className="text-xs bg-navy-100 dark:bg-navy-900 px-1 rounded">gradient-brand</code> utility to create hero sections that feel uniquely AIIP.
                  </Alert>
                </div>
              </DemoBox>

              <DemoBox label="Toast Notifications">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary"     size="sm" icon={<CheckCircle2 size={15} />} onClick={() => toast.success('Model deployed successfully!', 'Success')}>Success Toast</Button>
                  <Button variant="secondary"   size="sm" icon={<Bell size={15} />}         onClick={() => toast.warning('Rate limit at 87% — upgrade soon.', 'Warning')}>Warning Toast</Button>
                  <Button variant="destructive" size="sm" icon={<XCircle size={15} />}      onClick={() => toast.danger('API connection failed.', 'Error')}>Error Toast</Button>
                  <Button variant="outline"     size="sm" icon={<Clock size={15} />}         onClick={() => toast.info('New features available in v1.1')}>Info Toast</Button>
                </div>
              </DemoBox>

              <DemoBox label="Modal">
                <Button variant="primary" onClick={() => setModalOpen(true)} icon={<Plus size={16} />}>
                  Open Modal
                </Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Create New AI Agent"
                  size="md"
                  footer={
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                      <Button variant="primary" size="sm" onClick={() => { toast.success('Agent created!'); setModalOpen(false); }}>Create Agent</Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <Input label="Agent Name" placeholder="My AI Agent" fullWidth />
                    <Select
                      label="Model"
                      placeholder="Select a model..."
                      options={[
                        { value: 'gpt4', label: 'GPT-4o' },
                        { value: 'claude', label: 'Claude 3.5 Sonnet' },
                        { value: 'gemini', label: 'Gemini 1.5 Pro' },
                      ]}
                      fullWidth
                    />
                    <Textarea label="System Prompt" placeholder="You are a helpful AI assistant..." rows={4} fullWidth />
                    <Toggle checked label="Enable streaming responses" onChange={() => {}} />
                  </div>
                </Modal>
              </DemoBox>
            </Section>

            {/* ── Footer ────────────────────────────────────────────────── */}
            <div className="border-t border-[var(--color-border)] pt-10 pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src="/AIIP-Logo-Navy-Transparent.png" alt="AI Innovator Pro" className="h-7 w-auto opacity-60 dark:brightness-0 dark:invert dark:opacity-30" />
                  <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                    AI Innovator Pro Design System v1.0
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {[Star, Heart, Bookmark].map((Icon, i) => (
                    <button
                      key={i}
                      className="transition-fast hover:scale-110 focus-visible:outline-none"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
