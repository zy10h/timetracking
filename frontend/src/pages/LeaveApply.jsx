import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { applyLeave } from '../api/leave';

export default function LeaveApply() {
  const { user } = useAuth();
  const [form, setForm] = useState({ type:'ANNUAL', startDate:'', endDate:'', reason:'' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      await applyLeave(user.token, form);
      setMsg('Submitted'); setForm({ type:'ANNUAL', startDate:'', endDate:'', reason:'' });
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Leave Application</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded-2xl shadow space-y-3">
        <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="border rounded p-2">
          <option value="ANNUAL">Annual</option>
          <option value="SICK">Sick</option>
          <option value="CASUAL">Casual</option>
          <option value="OTHER">Other</option>
        </select>
        <div className="flex gap-3">
          <input type="date" className="border rounded p-2" value={form.startDate}
                 onChange={e=>setForm({...form, startDate:e.target.value})}/>
          <input type="date" className="border rounded p-2" value={form.endDate}
                 onChange={e=>setForm({...form, endDate:e.target.value})}/>
        </div>
        <textarea className="border rounded p-2 w-full" rows={3}
                  placeholder="Reason" value={form.reason}
                  onChange={e=>setForm({...form, reason:e.target.value})}/>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl">Submit</button>
        {msg && <div className="text-sm text-gray-700">{msg}</div>}
      </form>
    </main>
  );
}
