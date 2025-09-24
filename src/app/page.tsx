'use client';
import { useEffect, useState } from 'react';

export default function AdminHome() {
  const [me, setMe] = useState<any>(null);
  const [usage, setUsage] = useState<any>([]);
  const [entitlements, setEntitlements] = useState<any>({});
  const [auditLog, setAuditLog] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        const tenantId = 'default';
        
        const [meRes, usageRes, entitlementsRes, auditRes] = await Promise.all([
          fetch('/api/v1/me').then(r => r.json()).catch(() => null),
          fetch(`/api/usage/${tenantId}`).then(r => r.json()).catch(() => []),
          fetch(`/api/entitlements/${tenantId}`).then(r => r.json()).catch(() => ({})),
          fetch(`/api/audit/${tenantId}`).then(r => r.json()).catch(() => [])
        ]);

        setMe(meRes);
        setUsage(usageRes);
        setEntitlements(entitlementsRes);
        setAuditLog(auditRes);
      } catch (err) {
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading admin data...</div>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Keephy Enhanced Admin</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div style={{ marginBottom: 20 }}>
        <h2>RBAC & User Info</h2>
        <pre>{JSON.stringify(me, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Usage & Quotas</h2>
        <pre>{JSON.stringify(usage, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Module Entitlements</h2>
        <pre>{JSON.stringify(entitlements, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Audit Log</h2>
        <pre>{JSON.stringify(auditLog, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Ops Consoles</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button>Translation Editor</button>
          <button>Notification Rules</button>
          <button>Export Scheduler</button>
          <button>Integration Hub</button>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Migration Helper</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button>Feature Flags Panel</button>
          <button>Service Health</button>
          <button>Canary Control</button>
        </div>
      </div>
    </main>
  );
}


