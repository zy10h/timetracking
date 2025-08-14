import { useEffect, useState } from 'react';
import { getHistory } from '../api/attendance';
import { useAuth } from '../context/AuthContext';

export default function AttendanceHistory(){
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    getHistory(user.token).then(({data})=>setRows(data)).catch(()=>{});
  },[]);

  return (
    <div className="p-4">
      <h2>Attendance History</h2>
      <table>
        <thead><tr><th>Check In</th><th>Check Out</th><th>min</th><th>Remark</th></tr></thead>
        <tbody>
          {rows.map(r=>(
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