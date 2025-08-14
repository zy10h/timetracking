import { useEffect, useState, useCallback } from 'react';
import { checkIn, checkOut, getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const token = user?.token;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const refresh = useCallback(async () => {
    setErr('');
    try {
      const { data } = await getHistory(token);
      setRows(data);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load');
    }
  }, [token]); 

  const onCheckIn = async () => {
    setLoading(true);
    try {
      await checkIn(token);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const onCheckOut = async () => {
    setLoading(true);
    try {
      await checkOut(token);
      await refresh();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Check out failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [refresh]); 

  return (
    <div className="p-4 space-y-3">
      <h2>Attendance Dashboard</h2>
      <div className="space-x-2">
        <button disabled={loading} onClick={onCheckIn}>Check in</button>
        <button disabled={loading} onClick={onCheckOut}>Check out</button>
      </div>
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
      <h3>Recent Records</h3>
      <ul>
        {rows.slice(0, 5).map(r => (
          <li key={r._id}>
            {new Date(r.checkInAt).toLocaleString()} — {r.checkOutAt ? new Date(r.checkOutAt).toLocaleString() : 'Have not checked out'}
            {r.workedMinutes ? `（${r.workedMinutes} min）` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
