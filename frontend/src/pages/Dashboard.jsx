import { useEffect, useState } from 'react';
import { checkIn, checkOut, getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';
import { useCallback } from "react";


export default function Dashboard(){
  const { user } = useAuth(); 
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const refresh = useCallback(async () => {
  setErr('');
  try {
    const { data } = await getHistory(user.token);
    setRows(data);
  } catch (e) {
    setErr(e?.response?.data?.message || 'Failed to load');
  }
}, [user.token]);

  const onCheckIn = async ()=>{
    setLoading(true); setErr('');
    try{
      await checkIn(user.token);
      await refresh();
      alert('Checked In');
    }catch(e){
      alert(e?.response?.data?.message || 'Failed to check in');
    }finally{ setLoading(false); }
  };

  const onCheckOut = async ()=>{
    setLoading(true); setErr('');
    try{
      const { data } = await checkOut(user.token);
      await refresh();
      alert(`Checked out successfully, worked ${data?.workedMinutes ?? ''} min.`);
    }catch(e){
      alert(e?.response?.data?.message || 'Failed to check out');
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ refresh(); }, []);

  return (
    <div className="p-4">
      <h2>Attendance Dashboard</h2>
      <div className="space-x-8 my-3">
        <button disabled={loading} onClick={onCheckIn}>Check In</button>
        <button disabled={loading} onClick={onCheckOut}>Check Out</button>
      </div>
      {err && <div style={{color:'crimson'}}>{err}</div>}

      <h3>Recent Records</h3>
      <ul>
        {rows.slice(0,5).map(r=>(
          <li key={r._id}>
            {new Date(r.checkInAt).toLocaleString()} — {r.checkOutAt ? new Date(r.checkOutAt).toLocaleString() : 'Have not checked out'}
            {r.workedMinutes ? `（${r.workedMinutes} min）` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}