import { useEffect, useState } from 'react';
import { getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';

export default function AttendanceHistory() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');
  const token = user?.token; 

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setErr('');
      try {
        const { data } = await getHistory(token);
        if (!cancelled) setRows(data);
      } catch (e) {
        if (!cancelled) setErr(e?.response?.data?.message || 'Failed to load');
      }
    })();

    return () => { cancelled = true; };
  }, [token]); 

  return (
    <div className="p-4">
      <h2>Attendance History</h2>
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
      <table>
        <thead>
          <tr><th>Check In</th><th>Check Out</th><th>min</th><th>Remark</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{new Date(r.checkInAt).toLocaleString()}</td>
              <td>{r.checkOutAt ? new Date(r.checkOutAt).toLocaleString() : ''}</td>
              <td>{r.workedMinutes || ''}</td>
              <td>{r.notes || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
