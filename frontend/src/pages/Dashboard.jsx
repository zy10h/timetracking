import { useEffect, useState, useCallback } from 'react';
import { checkIn, checkOut, getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const token = user?.token;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const refresh = useCallback(async () => {
    setErr(''); setOk('');
    try {
      const { data } = await getHistory(token);
      setRows(data);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load');
    }
  }, [token]);

  const onIn = async () => {
    setLoading(true);
    try { await checkIn(token); setOk('Checked in'); await refresh(); }
    catch (e) { setErr(e?.response?.data?.message || 'Check in failed'); }
    finally { setLoading(false); }
  };

  const onOut = async () => {
    setLoading(true);
    try { const { data } = await checkOut(token); setOk(`Checked out successfully，worked ${data?.workedMinutes ?? ''} min`); await refresh(); }
    catch (e) { setErr(e?.response?.data?.message || 'Check-out failed'); }
    finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <section className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-semibold mb-3">Attendance Dashboard</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={onIn} disabled={loading}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
            Check in
          </button>
          <button onClick={onOut} disabled={loading}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60">
            Check out
          </button>
          {loading && <span className="text-sm text-gray-500">Processing…</span>}
        </div>
        {err && <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</div>}
        {ok  && <div className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">{ok}</div>}
      </section>

      <section className="bg-white rounded-2xl shadow p-5">
        <h3 className="text-lg font-semibold mb-3">Recent</h3>
        {rows.length === 0 ? (
          <div className="text-gray-500 text-sm">No records, press the button above to check in.</div>
        ) : (
          <ul className="divide-y">
            {rows.slice(0,5).map(r => (
              <li key={r._id} className="py-2 flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    Check in: {new Date(r.checkInAt).toLocaleString()}
                  </div>
                  <div className="text-gray-500">
                    {r.checkOutAt ? `Check out: ${new Date(r.checkOutAt).toLocaleString()}` : 'have not checked out'}
                  </div>
                </div>
                <div className="text-gray-700 text-sm">
                  {r.workedMinutes ? `${r.workedMinutes} min` : ''}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}



