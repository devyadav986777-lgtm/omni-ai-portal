'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.result || data.error || 'Something went wrong');
    } catch (err) {
      setResponse('Failed to fetch response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Omni AI Portal</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-4">
        <textarea
          className="w-full p-4 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !prompt}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div className="w-full max-w-xl mt-6 p-4 rounded bg-slate-800 border border-slate-700 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </main>
  );
}

