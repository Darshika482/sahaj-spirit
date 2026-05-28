import type { SupabaseClient } from '@supabase/supabase-js';

export async function generateMemberIds(db: SupabaseClient, count: number): Promise<string[]> {
  const { count: total } = await db
    .from('members')
    .select('*', { count: 'exact', head: true });

  const start = (total ?? 0) + 1;
  return Array.from({ length: count }, (_, i) =>
    `SS-2026-${String(start + i).padStart(4, '0')}`
  );
}
