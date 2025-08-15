import { useEffect, useState } from 'react';
import { getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';

export default function AttendanceHistory() {
  const { user } = useAuth();
  const token = user?.token;
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setErr('');
      try {
        if (!user?.token) return;
        const { data } = await getHistory(user.token);
        if (mounted) setRows(data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.message || 'Failed to load');
      }
    })();
    return () => { mounted = false; };
  }, [user?.token]); 

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <section className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Attendance History</h2>
        {err && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</div>}
        {rows.length === 0 ? (
          <div className="text-gray-500 text-sm">No data available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Check in time</th>
                  <th className="py-2 pr-4">Check out time</th>
                  <th className="py-2 pr-4">Work length</th>
                  <th className="py-2 pr-4">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map(r => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="py-2 pr-4">{new Date(r.checkInAt).toLocaleString()}</td>
                    <td className="py-2 pr-4">{r.checkOutAt ? new Date(r.checkOutAt).toLocaleString() : '—'}</td>
                    <td className="py-2 pr-4">{r.workedMinutes ? `${r.workedMinutes} min` : '—'}</td>
                    <td className="py-2 pr-4 text-gray-600">{r.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
