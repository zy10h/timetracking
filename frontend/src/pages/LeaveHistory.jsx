import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLeaveHistory } from '../api/leave';

export default function LeaveHistory(){
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async ()=>{
      try { const { data } = await getLeaveHistory(user.token); setRows(data); }
      catch (e) { setErr(e?.response?.data?.message || 'Failed to load'); }
    })();
  }, [user?.token]);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">My Leaves</h2>
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left text-gray-600 border-b">
            <th className="py-2 px-3">Type</th>
            <th className="py-2 px-3">Start</th>
            <th className="py-2 px-3">End</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Remark</th>
          </tr></thead>
          <tbody className="divide-y">
            {rows.map(r=>(
              <tr key={r._id}>
                <td className="py-2 px-3">{r.type}</td>
                <td className="py-2 px-3">{r.startDate?.slice(0,10)}</td>
                <td className="py-2 px-3">{r.endDate?.slice(0,10)}</td>
                <td className="py-2 px-3">{r.status}</td>
                <td className="py-2 px-3 text-gray-600">{r.reason || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
