import { useState, useEffect, useRef, type ReactNode, type ComponentType } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  IndianRupee,
  Clock,
  ClipboardList,
  Download,
  RefreshCw,
  LogOut,
  FileSpreadsheet,
  PenLine,
  X,
  ChevronRight,
  ChevronDown,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { getAdminRedirectUrl, normalizeAdminOrigin } from '../lib/adminRedirect';
import { resolveContentImageUrl } from '../lib/contentImages';

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

function AuthScreen({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(43,168,158,0.08),transparent_55%)] pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-ink/45 hover:text-teal transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-serif font-black text-[11px] uppercase tracking-[0.2em]">Sahaj Spirit</span>
        </Link>
        <div className="bg-white/80 border border-teal/10 rounded-3xl p-8 shadow-[0_24px_60px_rgba(26,26,26,0.06)] backdrop-blur-sm">
          <h2 className="font-serif font-bold text-[1.55rem] text-ink mb-2">{title}</h2>
          {subtitle && <p className="text-[14px] text-ink/50 leading-relaxed mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  accent: 'teal' | 'orange' | 'ink';
}) {
  const accents = {
    teal: 'border-teal/20 bg-teal/[0.04] text-teal',
    orange: 'border-orange/20 bg-orange/[0.04] text-orange',
    ink: 'border-ink/10 bg-white/70 text-ink/60',
  };

  return (
    <div className="bg-white/75 border border-teal/10 rounded-2xl p-4 shadow-[0_8px_24px_rgba(26,26,26,0.03)]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45 leading-snug">{label}</p>
        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${accents[accent]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="font-sans font-bold text-[1.5rem] sm:text-[1.65rem] text-ink leading-none tabular-nums">{value}</p>
    </div>
  );
}

function EmptyRegistrations({ filter }: { filter: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-teal/8 border border-teal/10 flex items-center justify-center mb-4">
        <ClipboardList className="w-7 h-7 text-teal/70" />
      </div>
      <p className="font-serif font-bold text-[1.1rem] text-ink mb-1">
        {filter === 'all' ? 'No registrations yet' : `No ${filter} registrations`}
      </p>
      <p className="text-[15px] text-ink/55 max-w-xs leading-relaxed">
        {filter === 'all'
          ? 'When someone registers for the summit, their booking will appear here.'
          : 'Try another filter to see other records.'}
      </p>
    </div>
  );
}

const EDITOR_SECTIONS = [
  { id: 'comic', label: 'Sahaj Comic', desc: '4 story panels' },
  { id: 'experiences', label: 'Experiences', desc: 'Workshop, poetry & more' },
  { id: 'bulletin', label: 'Bulletin Board', desc: 'Thought, word & challenge' },
] as const;

const editorLabelClass = 'block text-[14px] font-semibold text-ink/75 mb-2';
const editorInputClass =
  'bg-white border border-teal/20 rounded-xl px-4 py-3 text-[16px] text-ink font-sans leading-normal antialiased focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 w-full transition-colors';
const editorTextareaClass = `${editorInputClass} min-h-[110px] resize-y leading-relaxed`;

function EditorFieldLabel({ children }: { children: ReactNode }) {
  return <label className={editorLabelClass}>{children}</label>;
}

type EditorSectionId = typeof EDITOR_SECTIONS[number]['id'];

function SectionPicker({
  value,
  onChange,
}: {
  value: EditorSectionId;
  onChange: (id: EditorSectionId) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = EDITOR_SECTIONS.find(s => s.id === value)!;

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`w-full flex items-center justify-between gap-3 bg-white border rounded-xl px-4 py-3.5 text-left shadow-[0_4px_16px_rgba(26,26,26,0.04)] transition-all cursor-pointer ${
          open
            ? 'border-teal ring-2 ring-teal/15'
            : 'border-teal/20 hover:border-teal/35'
        }`}
      >
        <div className="min-w-0">
          <span className="block text-[16px] font-semibold text-ink">{selected.label}</span>
          <span className="block text-[13px] text-ink/50 mt-0.5">{selected.desc}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-teal shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 w-full bg-white border border-teal/12 rounded-xl shadow-[0_20px_48px_rgba(26,26,26,0.12)] overflow-hidden py-1.5"
        >
          {EDITOR_SECTIONS.map(sub => {
            const isSelected = value === sub.id;
            return (
              <li key={sub.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(sub.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-teal/[0.07]' : 'hover:bg-teal/[0.04]'
                  }`}
                >
                  <div className="min-w-0">
                    <span className={`block text-[15px] font-semibold ${isSelected ? 'text-teal' : 'text-ink'}`}>
                      {sub.label}
                    </span>
                    <span className="block text-[13px] text-ink/50 mt-0.5">{sub.desc}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-teal shrink-0" strokeWidth={2.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EditorSaveBar({
  label,
  saving,
  onSave,
  status,
}: {
  label: string;
  saving: boolean;
  onSave: () => void;
  status: { type: 'success' | 'error'; text: string } | null;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 px-4 py-4 mt-6 bg-cream/95 backdrop-blur-md border-t border-teal/10 sm:mx-0 sm:rounded-2xl sm:border sm:shadow-[0_-8px_24px_rgba(26,26,26,0.06)]">
      {status && (
        <div
          className={`mb-3 flex items-center gap-2.5 px-4 py-3 rounded-xl border ${
            status.type === 'success'
              ? 'bg-teal/10 text-teal border-teal/20'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span className="text-[14px] font-medium">{status.text}</span>
        </div>
      )}
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="w-full bg-teal text-white px-6 py-3.5 rounded-xl font-medium text-[15px] shadow-sm hover:bg-teal-deep transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {saving ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Saving changes...
          </>
        ) : (
          label
        )}
      </button>
    </div>
  );
}

function BulletinSection({
  title,
  desc,
  open,
  onToggle,
  children,
}: {
  title: string;
  desc: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="bg-white/85 border border-teal/12 rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,26,26,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-teal/[0.03] transition-colors"
      >
        <div className="min-w-0">
          <h4 className="font-serif font-bold text-[18px] text-ink">{title}</h4>
          <p className="text-[14px] text-ink/55 mt-1">{desc}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-teal shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-teal/10 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [authError, setAuthError] = useState('');
  const [token, setToken] = useState('');
  const [adminName, setAdminName] = useState('');
  const [canViewRegistrations, setCanViewRegistrations] = useState(false);
  const [canEditContent, setCanEditContent] = useState(false);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [filter, setFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');

  // Content Editor State
  const [activeTab, setActiveTab] = useState<'registrations' | 'editor'>('registrations');
  const [activeSubTab, setActiveSubTab] = useState<'comic' | 'experiences' | 'bulletin'>('comic');
  const [contentData, setContentData] = useState<any | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [selectedExpId, setSelectedExpId] = useState<string>('01');
  const [openBulletinSection, setOpenBulletinSection] = useState<'thought' | 'word' | 'challenge' | null>('thought');
  const [editorMessage, setEditorMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const editorMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const saveStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null); // tracks which field is uploading
  const sessionHandledRef = useRef(false);

  // Keep admin on www in production so OAuth callbacks are not broken by apex→www redirects.
  useEffect(() => {
    normalizeAdminOrigin();
  }, []);

  // Handle Google OAuth redirect and automatic session restore
  useEffect(() => {
    if (!supabaseConfigured || !supabase) return;

    let cancelled = false;
    let oauthTimeout: ReturnType<typeof setTimeout> | undefined;

    const clearOAuthHash = () => {
      if (window.location.hash || window.location.search.includes('code=')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    const handleSession = (accessToken: string, email: string) => {
      if (cancelled || sessionHandledRef.current) return;
      sessionHandledRef.current = true;
      clearOAuthHash();
      if (oauthTimeout) clearTimeout(oauthTimeout);
      setAuthState('checking');
      setToken(accessToken);
      checkAdmin(accessToken, email);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;

      if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        handleSession(session.access_token, session.user.email ?? '');
      } else if (event === 'SIGNED_OUT') {
        setAuthState('idle');
        setToken('');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;

      if (session) {
        handleSession(session.access_token, session.user.email ?? '');
      } else if (
        window.location.hash.includes('access_token') ||
        window.location.search.includes('code=')
      ) {
        // OAuth tokens are in the URL — wait for Supabase to parse them
        setAuthState('checking');
        oauthTimeout = setTimeout(() => {
          if (cancelled) return;
          clearOAuthHash();
          setAuthState('error');
          setAuthError(
            'Login session could not be established. Make sure your device date and time are set correctly, then try again.'
          );
        }, 8000);
      } else {
        setAuthState('idle');
      }
    });

    return () => {
      cancelled = true;
      if (oauthTimeout) clearTimeout(oauthTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const checkAdmin = async (accessToken: string, email: string) => {
    try {
      const meRes = await fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (meRes.status === 403 || meRes.status === 401) {
        await supabase?.auth.signOut();
        setToken('');
        setAuthState('unauthorized');
        return;
      }
      if (meRes.status === 503) {
        setAuthState('error');
        setAuthError('Server database is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env and restart the server.');
        return;
      }
      if (!meRes.ok) {
        setAuthState('error');
        setAuthError('Could not verify admin access.');
        return;
      }

      const me = await meRes.json();
      const canReg: boolean = me.can_view_registrations;
      const canContent: boolean = me.can_edit_content;

      setCanViewRegistrations(canReg);
      setCanEditContent(canContent);
      setAdminName(me.name || email.split('@')[0]);

      // Set default tab to whichever role the admin has
      if (canReg) setActiveTab('registrations');
      else if (canContent) setActiveTab('editor');

      setAuthState('authorized');

      // Pre-load data for whichever roles this admin has
      if (canReg) loadRegistrations(accessToken);
      if (canContent) loadContent(accessToken);
    } catch {
      setAuthState('error');
      setAuthError('Network error. Is the server running?');
    }
  };

  const loadRegistrations = async (accessToken: string) => {
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) setRegistrations(await res.json());
    } catch (err) {
      console.error('Failed to load registrations:', err);
    }
  };

  const loadContent = async (accessToken: string) => {
    setLoadingContent(true);
    try {
      const res = await fetch('/api/admin/content', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setContentData(data);
      } else {
        console.error('Failed to load content');
      }
    } catch (err) {
      console.error('Network error loading content:', err);
    } finally {
      setLoadingContent(false);
    }
  };

  const showEditorMessage = (msg: { type: 'success' | 'error'; text: string }, autoHideMs?: number) => {
    if (editorMessageTimeoutRef.current) clearTimeout(editorMessageTimeoutRef.current);
    setEditorMessage(msg);
    if (autoHideMs) {
      editorMessageTimeoutRef.current = setTimeout(() => setEditorMessage(null), autoHideMs);
    }
  };

  const showSaveStatus = (msg: { type: 'success' | 'error'; text: string }, autoHideMs?: number) => {
    if (saveStatusTimeoutRef.current) clearTimeout(saveStatusTimeoutRef.current);
    setSaveStatus(msg);
    if (autoHideMs) {
      saveStatusTimeoutRef.current = setTimeout(() => setSaveStatus(null), autoHideMs);
    }
  };

  const saveContent = async () => {
    if (!contentData) return;
    setSavingContent(true);
    setSaveStatus(null);
    try {
      const activeToken = token || (await supabase?.auth.getSession())?.data.session?.access_token;
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`,
        },
        body: JSON.stringify(contentData),
      });
      if (res.ok) {
        showSaveStatus({ type: 'success', text: 'Content saved successfully!' }, 5000);
      } else {
        const errData = await res.json();
        showSaveStatus({ type: 'error', text: errData.error || 'Failed to save content.' });
      }
    } catch (err: any) {
      showSaveStatus({ type: 'error', text: err.message || 'Network error occurred while saving.' });
    } finally {
      setSavingContent(false);
    }
  };

  // Helper updates for contentData
  const updateComicPanel = (index: number, field: string, value: string | boolean) => {
    if (!contentData) return;
    const updatedComic = [...contentData.comic];
    updatedComic[index] = { ...updatedComic[index], [field]: value };
    setContentData({ ...contentData, comic: updatedComic });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    if (!contentData) return;
    const updatedExperiences = contentData.experiences.map((exp: any) => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setContentData({ ...contentData, experiences: updatedExperiences });
  };

  const updateExperienceImage = (id: string, imgIndex: number, value: string) => {
    if (!contentData) return;
    const updatedExperiences = contentData.experiences.map((exp: any) => {
      if (exp.id === id) {
        const updatedImages = [...exp.images];
        updatedImages[imgIndex] = value;
        return { ...exp, images: updatedImages };
      }
      return exp;
    });
    setContentData({ ...contentData, experiences: updatedExperiences });
  };

  const updateBulletinThought = (field: string, value: string) => {
    if (!contentData) return;
    setContentData({
      ...contentData,
      bulletin: {
        ...contentData.bulletin,
        thought: {
          ...contentData.bulletin.thought,
          [field]: value
        }
      }
    });
  };

  const updateBulletinWord = (field: string, value: string) => {
    if (!contentData) return;
    setContentData({
      ...contentData,
      bulletin: {
        ...contentData.bulletin,
        word: {
          ...contentData.bulletin.word,
          [field]: value
        }
      }
    });
  };

  const updateBulletinChallenge = (field: string, value: string) => {
    if (!contentData) return;
    setContentData({
      ...contentData,
      bulletin: {
        ...contentData.bulletin,
        challenge: {
          ...contentData.bulletin.challenge,
          [field]: value
        }
      }
    });
  };

  // ── Image Upload Handler ────────────────────────────────────────────────────
  const uploadImage = async (file: File, fieldKey: string, onSuccess: (url: string) => void) => {
    setUploadingImage(fieldKey);
    setEditorMessage(null);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        // Strip the data:image/xxx;base64, prefix
        const base64 = result.split(',')[1];
        const activeToken = token || (await supabase?.auth.getSession())?.data.session?.access_token;

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeToken}`,
          },
          body: JSON.stringify({
            base64,
            filename: file.name,
            contentType: file.type,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          onSuccess(data.url);
          showEditorMessage({ type: 'success', text: `Image "${file.name}" uploaded successfully!` }, 4000);
        } else {
          const errData = await res.json();
          showEditorMessage({ type: 'error', text: errData.error || 'Image upload failed.' });
        }
        setUploadingImage(null);
      };
      reader.onerror = () => {
        showEditorMessage({ type: 'error', text: 'Failed to read image file.' });
        setUploadingImage(null);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showEditorMessage({ type: 'error', text: err.message || 'Upload error.' });
      setUploadingImage(null);
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) return;
    setAuthState('loading');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: getAdminRedirectUrl() },
    });
    if (error) {
      setAuthState('error');
      setAuthError(error.message);
    }
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    sessionHandledRef.current = false;
    setToken('');
    setRegistrations([]);
    setContentData(null);
    setAuthState('idle');
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
      await loadRegistrations(token);
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
  const filterCounts = {
    all: registrations.length,
    success: registrations.filter(r => r.payment_status === 'success').length,
    pending: registrations.filter(r => r.payment_status === 'pending').length,
    failed: registrations.filter(r => r.payment_status === 'failed').length,
  };
  const roleLabel = canViewRegistrations && canEditContent
    ? 'Full access'
    : canViewRegistrations
      ? 'Registrations'
      : 'Content editor';

  // ── Not configured ────────────────────────────────────────────────────────────
  if (!supabaseConfigured) {
    return (
      <AuthScreen
        title="Supabase not configured"
        subtitle="Add your Supabase URL and anon key to .env to enable the admin panel."
      >
        <div className="flex items-start gap-3 p-4 rounded-xl bg-orange/5 border border-orange/15 text-[13px] text-ink/60 leading-relaxed">
          <AlertCircle className="w-5 h-5 text-orange shrink-0 mt-0.5" />
          <p>
            Set <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal">VITE_SUPABASE_ANON_KEY</code> in your{' '}
            <code className="bg-teal/10 px-1.5 py-0.5 rounded text-teal">.env</code> file.
          </p>
        </div>
      </AuthScreen>
    );
  }

  // ── Auth states ────────────────────────────────────────────────────────────────
  if (authState === 'idle' || authState === 'loading' || authState === 'checking') {
    return (
      <AuthScreen
        title="Admin panel"
        subtitle="Sign in with your authorized Google account. Only whitelisted emails can access this area."
      >
        {authState === 'loading' || authState === 'checking' ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="w-5 h-5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
            <span className="text-[14px] text-ink/60">
              {authState === 'checking' ? 'Verifying access…' : 'Redirecting to Google…'}
            </span>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-ink/10 rounded-xl py-3.5 px-5 text-[14px] font-medium text-ink/75 hover:bg-cream-warm hover:border-teal/20 transition-all cursor-pointer shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        )}
      </AuthScreen>
    );
  }

  if (authState === 'unauthorized') {
    return (
      <AuthScreen
        title="Access denied"
        subtitle="Your Google account is not on the admin whitelist. Contact connect@sahajspirit.org to request access."
      >
        <button
          onClick={() => { sessionHandledRef.current = false; setAuthState('idle'); }}
          className="w-full py-3 rounded-xl border border-teal/20 text-teal text-[14px] font-medium hover:bg-teal/5 transition-colors cursor-pointer"
        >
          Back to sign in
        </button>
      </AuthScreen>
    );
  }

  if (authState === 'error') {
    return (
      <AuthScreen title="Something went wrong" subtitle={authError}>
        <button
          onClick={() => { sessionHandledRef.current = false; setAuthState('idle'); }}
          className="w-full py-3 rounded-xl bg-teal text-white text-[14px] font-medium hover:bg-teal-deep transition-colors cursor-pointer"
        >
          Try again
        </button>
      </AuthScreen>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream font-sans">
      <header className="sticky top-0 z-40 border-b border-teal/10 bg-cream/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-teal/10 bg-white/60 text-teal hover:bg-teal/5 transition-colors shrink-0"
                aria-label="Back to site"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="min-w-0">
                <p className="font-serif font-bold text-[15px] text-ink leading-tight">Admin</p>
                <p className="text-[11px] text-ink/40 truncate">{roleLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeTab === 'registrations' && canViewRegistrations && registrations.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium text-teal border border-teal/20 px-3 py-1.5 rounded-lg hover:bg-teal/5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              )}
              {activeTab === 'registrations' && canViewRegistrations && (
                <button
                  onClick={refreshData}
                  disabled={loadingData}
                  aria-label="Refresh registrations"
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-teal/10 bg-white/60 text-ink/50 hover:text-teal hover:bg-teal/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
                </button>
              )}
              {activeTab === 'editor' && canEditContent && (
                <button
                  onClick={() => loadContent(token)}
                  disabled={loadingContent}
                  aria-label="Reload content"
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-teal/10 bg-white/60 text-ink/50 hover:text-teal hover:bg-teal/5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingContent ? 'animate-spin' : ''}`} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-teal/10">
                <div className="w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center text-[12px] font-bold uppercase">
                  {adminName.charAt(0)}
                </div>
                <span className="text-[12px] text-ink/60 font-medium max-w-[100px] truncate">{adminName}</span>
              </div>
              <button
                onClick={signOut}
                aria-label="Sign out"
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-teal/10 bg-white/60 text-ink/40 hover:text-orange hover:border-orange/20 hover:bg-orange/5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {(canViewRegistrations || canEditContent) && (canViewRegistrations && canEditContent) && (
            <div className="flex gap-1 pb-3">
              {canViewRegistrations && (
                <button
                  onClick={() => setActiveTab('registrations')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                    activeTab === 'registrations'
                      ? 'bg-teal text-white shadow-[0_8px_20px_rgba(43,168,158,0.25)]'
                      : 'text-ink/50 hover:bg-white/70 hover:text-teal'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Registrations
                </button>
              )}
              {canEditContent && (
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                    activeTab === 'editor'
                      ? 'bg-teal text-white shadow-[0_8px_20px_rgba(43,168,158,0.25)]'
                      : 'text-ink/50 hover:bg-white/70 hover:text-teal'
                  }`}
                >
                  <PenLine className="w-4 h-4" />
                  Content editor
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* --- REGISTRATIONS TAB CONTENT --- */}
        {activeTab === 'registrations' && canViewRegistrations && (
          <>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif font-bold text-[1.35rem] sm:text-[1.5rem] text-ink">Registrations</h1>
                <p className="text-[13px] text-ink/45 mt-1">Summit bookings and payment status</p>
              </div>
              {registrations.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="sm:hidden inline-flex items-center gap-1.5 text-[12px] font-medium text-teal border border-teal/20 px-3 py-2 rounded-xl hover:bg-teal/5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <StatCard label="Total registrations" value={registrations.length} icon={ClipboardList} accent="ink" />
              <StatCard label="Confirmed members" value={totalMembers} icon={Users} accent="teal" />
              <StatCard label="Revenue collected" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={IndianRupee} accent="teal" />
              <StatCard label="Pending payments" value={filterCounts.pending} icon={Clock} accent="orange" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              {(['all', 'success', 'pending', 'failed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-medium capitalize transition-all cursor-pointer ${
                    filter === f
                      ? 'bg-teal text-white shadow-sm'
                      : 'bg-white/70 text-ink/55 border border-teal/10 hover:border-teal/25 hover:text-teal'
                  }`}
                >
                  {f}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md tabular-nums ${
                    filter === f ? 'bg-white/20' : 'bg-teal/5 text-ink/45'
                  }`}>
                    {filterCounts[f]}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.length === 0 ? (
                <div className="bg-white/75 border border-teal/10 rounded-2xl">
                  <EmptyRegistrations filter={filter} />
                </div>
              ) : (
                filtered.map(reg => (
                  <button
                    key={reg.id}
                    onClick={() => loadMembers(reg)}
                    className="w-full text-left bg-white/75 border border-teal/10 rounded-2xl p-4 hover:border-teal/25 hover:shadow-[0_8px_24px_rgba(43,168,158,0.08)] transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <p className="font-medium text-[15px] text-ink truncate">{reg.payer_name}</p>
                        <p className="text-[12px] text-ink/45 truncate mt-0.5">{reg.payer_email}</p>
                      </div>
                      <span className={`shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${STATUS_COLORS[reg.payment_status] || ''}`}>
                        {reg.payment_status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-ink/50">
                      <span>{reg.member_count} member{reg.member_count !== 1 ? 's' : ''}</span>
                      <span className="font-semibold text-ink/70 tabular-nums">₹{reg.amount_paid.toLocaleString('en-IN')}</span>
                      <span>{new Date(reg.registered_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-teal/8 flex items-center justify-between text-teal text-[12px] font-medium">
                      <span>View members</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white/75 border border-teal/10 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(26,26,26,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-teal/10 bg-teal/[0.03] text-left">
                      {['Payer', 'Contact', 'Members', 'Amount', 'Status', 'Date', ''].map(h => (
                        <th key={h} className="px-4 py-3.5 font-medium text-[11px] uppercase tracking-wider text-ink/40 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(reg => (
                      <tr key={reg.id} className="border-b border-teal/5 last:border-0 hover:bg-teal/[0.03] transition-colors">
                        <td className="px-4 py-3.5 font-medium text-ink whitespace-nowrap">{reg.payer_name}</td>
                        <td className="px-4 py-3.5 text-ink/55">
                          <div className="flex flex-col">
                            <span>{reg.payer_email}</span>
                            <span className="text-[11px] text-ink/35">{reg.payer_mobile}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center text-ink/70 tabular-nums">{reg.member_count}</td>
                        <td className="px-4 py-3.5 font-medium text-ink/75 tabular-nums">
                          ₹{reg.amount_paid.toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize border ${STATUS_COLORS[reg.payment_status] || ''}`}>
                            {reg.payment_status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-ink/45 whitespace-nowrap tabular-nums">
                          {new Date(reg.registered_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => loadMembers(reg)}
                            className="inline-flex items-center gap-1 text-teal text-[12px] font-medium hover:text-teal-deep transition-colors cursor-pointer"
                          >
                            Members
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7}>
                          <EmptyRegistrations filter={filter} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* --- CONTENT EDITOR TAB CONTENT --- */}
        {activeTab === 'editor' && canEditContent && (
          <>
            <div className="mb-6">
              <h1 className="font-serif font-bold text-[1.5rem] sm:text-[1.65rem] text-ink">Content editor</h1>
              <p className="text-[15px] text-ink/60 mt-1.5 leading-relaxed">Update comic panels, experiences, and bulletin board</p>
            </div>

            {/* Section picker */}
            <div className="mb-6">
              <EditorFieldLabel>Choose section to edit</EditorFieldLabel>
              <SectionPicker
                value={activeSubTab}
                onChange={(val) => {
                  setActiveSubTab(val);
                  setSaveStatus(null);
                  if (val === 'bulletin') setOpenBulletinSection('thought');
                }}
              />
            </div>

            {loadingContent && !contentData && (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                <span className="text-[14px] text-ink/50 font-medium">Fetching content data...</span>
              </div>
            )}

            {!contentData && !loadingContent && (
              <div className="text-center py-16 bg-white/40 border border-teal/10 rounded-2xl">
                <p className="text-[14px] text-ink/50 mb-4">No content data loaded.</p>
                <button
                  onClick={() => loadContent(token)}
                  className="bg-teal text-white px-5 py-2.5 rounded-xl font-medium text-[13px] hover:bg-teal-dark transition-all cursor-pointer"
                >
                  Load Content Data
                </button>
              </div>
            )}

            {/* Comic panel form */}
            {activeSubTab === 'comic' && contentData && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
                  {contentData.comic.map((panel: any, idx: number) => {
                    const isVisible = panel.visible !== false;
                    return (
                    <div
                      key={idx}
                      className={`bg-white/60 border rounded-2xl p-4 sm:p-6 relative transition-opacity ${
                        isVisible ? 'border-teal/10' : 'border-ink/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[12px] font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                          Panel {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateComicPanel(idx, 'visible', !isVisible)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all cursor-pointer ${
                            isVisible
                              ? 'bg-teal/5 text-teal border-teal/20 hover:bg-teal/10'
                              : 'bg-ink/5 text-ink/60 border-ink/15 hover:bg-ink/10'
                          }`}
                        >
                          {isVisible ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              Visible on site
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              Hidden on site
                            </>
                          )}
                        </button>
                      </div>

                      {/* Preview — natural image aspect ratio */}
                      <div className="rounded-xl bg-teal/5 border border-teal/10 overflow-hidden mb-4 flex items-center justify-center">
                        <img
                          src={resolveContentImageUrl(panel.image)}
                          alt={panel.title}
                          className="w-full h-auto max-h-64 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Comic';
                          }}
                        />
                      </div>

                      <input
                        type="text"
                        value={panel.title}
                        onChange={(e) => updateComicPanel(idx, 'title', e.target.value)}
                        placeholder="Panel title..."
                        className="mb-4 bg-transparent border-none text-[18px] font-serif font-bold text-ink focus:outline-none w-full placeholder:text-ink/30 antialiased"
                      />

                      <div className="space-y-4">
                        <div>
                          <EditorFieldLabel>Description</EditorFieldLabel>
                          <textarea
                            value={panel.desc}
                            onChange={(e) => updateComicPanel(idx, 'desc', e.target.value)}
                            className={editorTextareaClass}
                          />
                        </div>
                        <div>
                          <EditorFieldLabel>Image URL</EditorFieldLabel>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={panel.image}
                              onChange={(e) => updateComicPanel(idx, 'image', e.target.value)}
                              className={`${editorInputClass} text-[14px]`}
                            />
                            <label
                              className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border cursor-pointer transition-all ${
                                uploadingImage === `comic-${idx}`
                                  ? 'bg-teal/10 text-teal border-teal/20 opacity-60 pointer-events-none'
                                  : 'bg-teal/5 text-teal border-teal/15 hover:bg-teal/10'
                              }`}
                            >
                              {uploadingImage === `comic-${idx}` ? (
                                <div className="w-3.5 h-3.5 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) uploadImage(file, `comic-${idx}`, (url) => updateComicPanel(idx, 'image', url));
                                  e.target.value = '';
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                
                <EditorSaveBar
                  label="Save comic content"
                  saving={savingContent}
                  onSave={saveContent}
                  status={saveStatus}
                />
              </div>
            )}

            {/* Experiences Editor */}
            {activeSubTab === 'experiences' && contentData && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Experience list — sidebar on desktop, scroll row on mobile */}
                  <div className="w-full lg:w-56 xl:w-64 shrink-0">
                    <p className="text-[14px] font-semibold text-ink/60 mb-2 px-1">Select experience</p>
                    <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none -mx-1 px-1 lg:mx-0 lg:px-0 lg:bg-white/60 lg:border lg:border-teal/10 lg:rounded-2xl lg:p-2">
                      {contentData.experiences.map((exp: any) => (
                        <button
                          key={exp.id}
                          onClick={() => setSelectedExpId(exp.id)}
                          className={`shrink-0 lg:shrink lg:w-full text-left px-3 py-3 rounded-xl text-[14px] sm:text-[15px] font-medium transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                            selectedExpId === exp.id
                              ? 'bg-teal text-white shadow-sm'
                              : 'bg-white/70 text-ink/55 hover:bg-teal/5 hover:text-teal border border-teal/10 lg:border-transparent'
                          }`}
                        >
                          <span className={`font-mono text-[10px] mr-1.5 ${selectedExpId === exp.id ? 'text-white/60' : 'text-ink/35'}`}>
                            {exp.id}
                          </span>
                          {exp.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience form */}
                  <div className="flex-1 min-w-0 w-full bg-white/75 border border-teal/10 rounded-2xl p-4 sm:p-6 shadow-[0_8px_24px_rgba(26,26,26,0.03)]">
                    {(() => {
                      const exp = contentData.experiences.find((e: any) => e.id === selectedExpId);
                      if (!exp) return <div className="text-center py-8 text-ink/40 text-[13px]">Select an experience to edit.</div>;

                      return (
                        <div className="space-y-4 sm:space-y-5">
                          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-teal/10">
                            <div>
                              <h3 className="font-serif font-bold text-[1.1rem] sm:text-[1.25rem] text-ink">{exp.title}</h3>
                              <p className="text-[12px] text-ink/45 mt-1">Edit copy and carousel images</p>
                            </div>
                            <span className="font-mono text-[11px] text-teal bg-teal/10 px-2.5 py-1 rounded-full">ID {exp.id}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <EditorFieldLabel>Title</EditorFieldLabel>
                              <input
                                type="text"
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                                className={editorInputClass}
                              />
                            </div>
                            <div>
                              <EditorFieldLabel>Script heading</EditorFieldLabel>
                              <input
                                type="text"
                                value={exp.script}
                                onChange={(e) => updateExperience(exp.id, 'script', e.target.value)}
                                className={editorInputClass}
                              />
                            </div>
                          </div>

                          <div>
                            <EditorFieldLabel>Tagline</EditorFieldLabel>
                            <input
                              type="text"
                              value={exp.tagline}
                              onChange={(e) => updateExperience(exp.id, 'tagline', e.target.value)}
                              className={editorInputClass}
                            />
                          </div>

                          <div>
                            <EditorFieldLabel>Body description</EditorFieldLabel>
                            <textarea
                              value={exp.body}
                              onChange={(e) => updateExperience(exp.id, 'body', e.target.value)}
                              className={editorTextareaClass}
                            />
                          </div>

                          <div>
                            <EditorFieldLabel>Image alt text</EditorFieldLabel>
                            <input
                              type="text"
                              value={exp.alt || ''}
                              onChange={(e) => updateExperience(exp.id, 'alt', e.target.value)}
                              className={editorInputClass}
                            />
                          </div>

                          {/* Carousel Images */}
                          <div className="pt-4 border-t border-teal/8">
                            <EditorFieldLabel>Carousel images</EditorFieldLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {[0, 1, 2].map((imgIdx) => (
                                <div key={imgIdx} className="bg-white/40 border border-teal/5 rounded-xl p-2.5">
                                  <div className="aspect-[4/3] w-full rounded-lg bg-teal/5 border border-teal/10 overflow-hidden mb-2">
                                    <img
                                      src={resolveContentImageUrl(exp.images[imgIdx])}
                                      alt={`${exp.title} ${imgIdx + 1}`}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/300x200?text=No+Image';
                                      }}
                                    />
                                  </div>
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      value={exp.images[imgIdx] || ''}
                                      onChange={(e) => updateExperienceImage(exp.id, imgIdx, e.target.value)}
                                      className="bg-white border border-teal/15 rounded-md px-2 py-1 text-[11px] text-ink focus:outline-none focus:border-teal flex-1 font-mono min-w-0"
                                    />
                                    <label
                                      className={`shrink-0 flex items-center px-1.5 py-1 rounded-md text-[10px] font-medium border cursor-pointer transition-all ${
                                        uploadingImage === `exp-${exp.id}-${imgIdx}`
                                          ? 'bg-teal/10 text-teal border-teal/20 opacity-60 pointer-events-none'
                                          : 'bg-teal/5 text-teal border-teal/15 hover:bg-teal/10'
                                      }`}
                                    >
                                      {uploadingImage === `exp-${exp.id}-${imgIdx}` ? (
                                        <div className="w-3 h-3 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                                      ) : (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                      )}
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) uploadImage(file, `exp-${exp.id}-${imgIdx}`, (url) => updateExperienceImage(exp.id, imgIdx, url));
                                          e.target.value = '';
                                        }}
                                      />
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>

                <EditorSaveBar
                  label="Save experiences content"
                  saving={savingContent}
                  onSave={saveContent}
                  status={saveStatus}
                />
              </div>
            )}

            {/* Bulletin Board Editor */}
            {activeSubTab === 'bulletin' && contentData && (
              <div className="space-y-4">
                <BulletinSection
                  title="Thought of the Day"
                  desc="Quote note on the cork board"
                  open={openBulletinSection === 'thought'}
                  onToggle={() => setOpenBulletinSection(openBulletinSection === 'thought' ? null : 'thought')}
                >
                  <div>
                    <EditorFieldLabel>Quote content</EditorFieldLabel>
                    <textarea
                      value={contentData.bulletin.thought.quote}
                      onChange={(e) => updateBulletinThought('quote', e.target.value)}
                      className={editorTextareaClass}
                    />
                  </div>
                  <div>
                    <EditorFieldLabel>Author attribution</EditorFieldLabel>
                    <input
                      type="text"
                      value={contentData.bulletin.thought.author}
                      onChange={(e) => updateBulletinThought('author', e.target.value)}
                      className={editorInputClass}
                    />
                  </div>
                  <div>
                    <EditorFieldLabel>Action tip / prompt</EditorFieldLabel>
                    <textarea
                      value={contentData.bulletin.thought.tip}
                      onChange={(e) => updateBulletinThought('tip', e.target.value)}
                      className={editorTextareaClass}
                    />
                  </div>
                </BulletinSection>

                <BulletinSection
                  title="Word of the Section"
                  desc="Sanskrit term and definition"
                  open={openBulletinSection === 'word'}
                  onToggle={() => setOpenBulletinSection(openBulletinSection === 'word' ? null : 'word')}
                >
                  <div>
                    <EditorFieldLabel>English word</EditorFieldLabel>
                    <input
                      type="text"
                      value={contentData.bulletin.word.word}
                      onChange={(e) => updateBulletinWord('word', e.target.value)}
                      className={editorInputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <EditorFieldLabel>Sanskrit script</EditorFieldLabel>
                      <input
                        type="text"
                        value={contentData.bulletin.word.sanskrit}
                        onChange={(e) => updateBulletinWord('sanskrit', e.target.value)}
                        className={editorInputClass}
                      />
                    </div>
                    <div>
                      <EditorFieldLabel>IPA phonetics</EditorFieldLabel>
                      <input
                        type="text"
                        value={contentData.bulletin.word.phonetic}
                        onChange={(e) => updateBulletinWord('phonetic', e.target.value)}
                        className={editorInputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <EditorFieldLabel>Core translation</EditorFieldLabel>
                    <input
                      type="text"
                      value={contentData.bulletin.word.translation}
                      onChange={(e) => updateBulletinWord('translation', e.target.value)}
                      className={editorInputClass}
                    />
                  </div>
                  <div>
                    <EditorFieldLabel>Detailed explanation</EditorFieldLabel>
                    <textarea
                      value={contentData.bulletin.word.meaning}
                      onChange={(e) => updateBulletinWord('meaning', e.target.value)}
                      className={editorTextareaClass}
                    />
                  </div>
                </BulletinSection>

                <BulletinSection
                  title="Mindful Challenge"
                  desc="Interactive task card for visitors"
                  open={openBulletinSection === 'challenge'}
                  onToggle={() => setOpenBulletinSection(openBulletinSection === 'challenge' ? null : 'challenge')}
                >
                  <div>
                    <EditorFieldLabel>Challenge title</EditorFieldLabel>
                    <input
                      type="text"
                      value={contentData.bulletin.challenge.title}
                      onChange={(e) => updateBulletinChallenge('title', e.target.value)}
                      className={`${editorInputClass} font-semibold`}
                    />
                  </div>
                  <div>
                    <EditorFieldLabel>Task description</EditorFieldLabel>
                    <textarea
                      value={contentData.bulletin.challenge.desc}
                      onChange={(e) => updateBulletinChallenge('desc', e.target.value)}
                      className={`${editorTextareaClass} min-h-[140px]`}
                    />
                  </div>
                </BulletinSection>

                <EditorSaveBar
                  label="Save bulletin board"
                  saving={savingContent}
                  onSave={saveContent}
                  status={saveStatus}
                />
              </div>
            )}

            {/* Upload toast */}
            {editorMessage && (
              <div className="fixed bottom-6 inset-x-4 z-50 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md">
                <div
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-[0_16px_40px_rgba(26,26,26,0.15)] ${
                    editorMessage.type === 'success'
                      ? 'bg-white border-teal/25'
                      : 'bg-white border-red-200'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      editorMessage.type === 'success' ? 'bg-teal/10 text-teal' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {editorMessage.type === 'success' ? (
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <p className={`text-[14px] font-medium flex-1 ${editorMessage.type === 'success' ? 'text-teal' : 'text-red-700'}`}>
                    {editorMessage.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditorMessage(null)}
                    className="text-ink/35 hover:text-ink/60 p-1 cursor-pointer"
                    aria-label="Dismiss"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </main>

      {/* Members drawer */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" onClick={() => setSelectedReg(null)} />
          <div className="relative bg-cream w-full max-w-md h-full border-l border-teal/10 overflow-y-auto shadow-[-16px_0_48px_rgba(26,26,26,0.12)]">
            <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur-md border-b border-teal/10 px-5 py-4">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-teal font-medium mb-1">Registration</p>
                  <h3 className="font-serif font-bold text-[1.15rem] text-ink truncate">{selectedReg.payer_name}</h3>
                  <p className="text-[12px] text-ink/45 mt-0.5 truncate">{selectedReg.payer_email}</p>
                </div>
                <button
                  onClick={() => setSelectedReg(null)}
                  aria-label="Close"
                  className="text-ink/40 hover:text-teal transition-colors w-9 h-9 rounded-xl border border-teal/10 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${STATUS_COLORS[selectedReg.payment_status] || ''}`}>
                  {selectedReg.payment_status}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-teal/8 text-teal border border-teal/15">
                  {selectedReg.member_count} member{selectedReg.member_count !== 1 ? 's' : ''}
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-ink/60 border border-teal/10 tabular-nums">
                  ₹{selectedReg.amount_paid.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {loadingMembers ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                  <span className="text-[13px] text-ink/45">Loading members…</span>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-12 text-[13px] text-ink/45">No members found for this registration.</div>
              ) : (
                members.map(m => (
                  <div key={m.id} className="bg-white/80 border border-teal/10 rounded-2xl px-4 py-3.5 flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-[14px] text-ink">{m.name}</p>
                      <p className="text-[12px] text-ink/45 mt-1">
                        {m.gender} · Age {m.age} · {m.dietary}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] uppercase tracking-wider text-ink/35 mb-0.5">ID</p>
                      <p className="font-mono text-teal text-[12px] font-bold">
                        {m.member_id ?? 'PENDING'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
