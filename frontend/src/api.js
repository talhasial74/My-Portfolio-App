const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export function getProjects() {
  return fetch(`${API_BASE}/projects`).then(handle);
}

export function getSkills() {
  return fetch(`${API_BASE}/skills`).then(handle);
}

export function sendMessage(payload) {
  return fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(handle);
}
