import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, supabaseConfigured } from '../lib/supabase';

interface Registration {
  id: string;
  payer_name: string;
  payer_email: string;
  payer_mobile: string;
  member_count: number;
  amount_paid: number;
  payment_status: 'pending' | 'success' | 'failed';
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  registered_at: string;
}

interface Member {
  id: string;
  member_id: string | null;
  name: string;
  gender: string;
  age: number;
  dietary: string;
}

type AuthState = 'idle' | 'loading' | 'checking' | 'authorized' | 'unauthorized' | 'error';

const STATUS_COLORS: Record<string, string> = {
  success: 'bg-teal/10 text-teal border-teal/20',
  pending: 'bg-orange/10 text-orange border-orange/20',
  failed: 'bg-red-100 text-red-600 border-red-200',
};

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [authError, setAuthError] = useState('');
  const [token, setToken] = useState('');
  const [adminName, setAdminName] = useState('');

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [filter, setFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');

  // Handle Google OAuth redirect
  useEffect(() => {
    if (!supabaseConfigured || !supabase) return;

    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      setAuthState('checking');
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setToken(session.access_token);
          checkAdmin(session.access_token, session.user.email ?? '');
        } else {
          setAuthState('error');
          setAuthError('Session not found after login.');
        }
      });
    }
  }, []);

  const checkAdmin = async (accessToken: string, email: string) => {
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
        const nameFromEmail = email.split('@')[0];
        setAdminName(nameFromEmail);
        setAuthState('authorized');
      } else if (res.status === 403) {
        setAuthState('unauthorized');
      } else {
        setAuthState('error');
        setAuthError('Could not verify admin access.');
      }
    } catch {
      setAuthState('error');
      setAuthError('Network error. Is the server running?');
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) return;
    setAuthState('loading');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href },
    });
    if (error) {
      setAuthState('error');
      setAuthError(error.message);
    }
  };

  const loadMembers = async (reg: Registration) => {
    setSelectedReg(reg);
    setLoadingMembers(true);
    try {
      const res = await fetch(`/api/admin/registrations/${reg.id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMembers(data);
    } catch {
      setMembers([]);
    } finally {
      setLoadingMembers(false);
    }
  };

  const refreshData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRegistrations(data);
    } finally {
      setLoadingData(false);
    }
  };

  const exportCSV = () => {
    window.open(`/api/admin/export`, '_blank');
  };

  const filtered = registrations.filter(r => filter === 'all' || r.payment_status === filter);
  const totalRevenue = registrations.filter(r => r.payment_status === 'success').reduce((s, r) => s + r.amount_paid, 0);
  const totalMembers = registrations.filter(r => r.payment_status === 'success').reduce((s, r) => s + r.member_count, 0);

  // ── Not configured ────────────────────────────────────────────────────────────
  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center text-orange mx-auto mb-6">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="font-serif font-bold text-[1.6rem] text-ink mb-3">Supabase Not Configured</h2>
          <p className="text-[14px] text-ink/55 leading-relaxed mb-6">
            Add <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal text-[13px]">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal text-[13px]">VITE_SUPABASE_ANON_KEY</code> to your{' '}
            <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal text-[13px]">.env</code> file to enable the admin panel.
          </p>
          <Link to="/" className="text-teal text-[14px] font-medium hover:underline">← Back to site</Link>
        </div>
      </div>
    );
  }

  // ── Auth states ────────────────────────────────────────────────────────────────
  if (authState === 'idle' || authState === 'loading' || authState === 'checking') {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <Link to="/" className="inline-block mb-10">
            <span className="font-serif font-black text-[1.1rem] uppercase tracking-widest text-ink/60">
              SAHAJ SPIRIT
            </span>
          </Link>
          <div className="bg-white/60 border border-teal/15 rounded-3xl p-8 shadow-sm">
            <h2 className="font-serif font-bold text-[1.5rem] text-ink mb-2">Admin Panel</h2>
            <p className="text-[13px] text-ink/50 mb-8">Sign in with your authorized Google account</p>

            {authState === 'loading' || authState === 'checking' ? (
              <div className="flex items-center justify-center gap-3 py-2">
                <div className="w-5 h-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                <span className="text-[14px] text-ink/60">
                  {authState === 'checking' ? 'Checking authorization...' : 'Redirecting...'}
                </span>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (authState === 'unauthorized') {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <h2 className="font-serif font-bold text-[1.5rem] text-ink mb-3">Access Denied</h2>
          <p className="text-[14px] text-ink/55 leading-relaxed mb-6">
            Your Google account is not authorized as an admin. Contact{' '}
            <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">connect@sahajspirit.org</a>{' '}
            to request access.
          </p>
          <Link to="/" className="text-teal text-[14px] font-medium hover:underline">← Back to site</Link>
        </div>
      </div>
    );
  }

  if (authState === 'error') {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <h2 className="font-serif font-bold text-[1.5rem] text-ink mb-3">Something went wrong</h2>
          <p className="text-[14px] text-ink/55 mb-6">{authError}</p>
          <button onClick={() => setAuthState('idle')} className="text-teal text-[14px] font-medium hover:underline cursor-pointer">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F3EC] font-sans">
      {/* Top bar */}
      <header className="border-b border-teal/10 bg-[#F7F3EC]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[11px] font-medium text-teal hover:text-teal/70 flex items-center gap-1.5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Site
          </Link>
          <span className="text-ink/20">|</span>
          <span className="font-serif font-bold text-[15px] text-ink">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-ink/50 hidden sm:block">Welcome, {adminName}</span>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 text-[12px] font-medium text-teal border border-teal/20 px-3 py-1.5 rounded-lg hover:bg-teal/5 transition-colors cursor-pointer"
          >
            Export CSV
          </button>
          <button
            onClick={refreshData}
            disabled={loadingData}
            className="flex items-center gap-1.5 text-[12px] font-medium text-ink/50 border border-teal/10 px-3 py-1.5 rounded-lg hover:bg-teal/5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loadingData ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Registrations', value: registrations.length },
            { label: 'Confirmed Members', value: totalMembers },
            { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
            { label: 'Pending Payments', value: registrations.filter(r => r.payment_status === 'pending').length },
          ].map(stat => (
            <div key={stat.label} className="bg-white/60 border border-teal/10 rounded-2xl px-5 py-4">
              <p className="text-[11px] font-mono uppercase tracking-wider text-ink/40 mb-1">{stat.label}</p>
              <p className="font-serif font-black text-[1.6rem] text-ink leading-none">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-5">
          {(['all', 'success', 'pending', 'failed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium capitalize transition-colors cursor-pointer ${
                filter === f ? 'bg-teal text-white' : 'bg-teal/5 text-ink/60 hover:bg-teal/10'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-ink/40">{filtered.length} records</span>
        </div>

        {/* Table */}
        <div className="bg-white/60 border border-teal/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-teal/10 text-left">
                  {['Payer', 'Contact', 'Members', 'Amount', 'Status', 'Date', ''].map(h => (
                    <th key={h} className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-ink/40 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(reg => (
                  <tr key={reg.id} className="border-b border-teal/5 hover:bg-teal/[0.03] transition-colors">
                    <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{reg.payer_name}</td>
                    <td className="px-4 py-3 text-ink/55">
                      <div className="flex flex-col">
                        <span>{reg.payer_email}</span>
                        <span className="text-[11px] text-ink/35">{reg.payer_mobile}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-ink/70">{reg.member_count}</td>
                    <td className="px-4 py-3 font-mono text-ink/70">
                      ₹{reg.amount_paid.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${STATUS_COLORS[reg.payment_status] || ''}`}>
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink/40 whitespace-nowrap">
                      {new Date(reg.registered_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => loadMembers(reg)}
                        className="text-teal text-[12px] font-medium hover:underline cursor-pointer"
                      >
                        Members
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-[14px] text-ink/35">
                      No registrations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Members drawer */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedReg(null)} />
          <div className="relative bg-[#F7F3EC] w-full max-w-sm h-full border-l border-teal/10 overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif font-bold text-[1.1rem] text-ink">{selectedReg.payer_name}</h3>
                <p className="text-[12px] text-ink/45 mt-0.5">{selectedReg.payer_email}</p>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="text-ink/40 hover:text-teal transition-colors w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {loadingMembers ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                </div>
              ) : members.map(m => (
                <div key={m.id} className="bg-white/60 border border-teal/10 rounded-xl px-4 py-3 flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[14px] text-ink">{m.name}</p>
                    <p className="text-[12px] text-ink/45 mt-0.5">
                      {m.gender} · Age {m.age} · {m.dietary}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-teal text-[13px] font-bold">
                      {m.member_id ?? 'PENDING'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
