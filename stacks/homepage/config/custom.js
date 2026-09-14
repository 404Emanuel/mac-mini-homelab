// Live NOC status bar: injects pills above the first group and
// updates them from Prometheus. Re-inserts after React re-renders.
(() => {
  const PROM = 'http://192.168.1.118:9090/api/v1/query';

  const q = async (query) => {
    try {
      const r = await fetch(`${PROM}?query=${encodeURIComponent(query)}`);
      const d = await r.json();
      return d?.data?.result?.[0]?.value?.[1] ?? null;
    } catch {
      return null;
    }
  };

  const pill = (id, cls, text) =>
    `<span id="${id}" class="status-pill ${cls}"><span class="dot"></span> ${text}</span>`;

  const ensureBar = () => {
    if (document.getElementById('homelab-status-bar')) return;
    const anchor = document.querySelector('.services-group');
    if (!anchor || !anchor.parentElement) return;

    const bar = document.createElement('div');
    bar.id = 'homelab-status-bar';
    bar.innerHTML = `
      <div class="status-group">
        ${pill('sb-overall', 'ok', 'Checking…')}
        ${pill('sb-targets', '', 'Targets —')}
        ${pill('sb-temp', '', 'CPU — °C')}
        ${pill('sb-disk', '', 'Disk — %')}
      </div>
      <div class="status-group">
        ${pill('sb-host', '', '192.168.1.118 · Debian 13')}
      </div>`;
    anchor.parentElement.insertBefore(bar, anchor);
  };

  const setPill = (id, cls, text) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `status-pill ${cls}`;
    el.innerHTML = `<span class="dot"></span> ${text}`;
  };

  const refresh = async () => {
    ensureBar();
    if (!document.getElementById('homelab-status-bar')) return;

    const [up, total, temp, disk] = await Promise.all([
      q('count(up == 1)'),
      q('count(up)'),
      q('max(node_hwmon_temp_celsius{chip="platform_coretemp_0"})'),
      q('100 * (1 - (node_filesystem_avail_bytes{mountpoint="/",fstype!~"tmpfs|overlay"} / node_filesystem_size_bytes{mountpoint="/",fstype!~"tmpfs|overlay"}))'),
    ]);

    if (up === null) {
      setPill('sb-overall', 'alert', 'Prometheus unreachable');
      return;
    }

    const down = (Number(total) || 0) - (Number(up) || 0);
    setPill('sb-overall', down > 0 ? 'alert' : 'ok', down > 0 ? `${down} target(s) down` : 'All systems nominal');
    setPill('sb-targets', down > 0 ? 'warn' : '', `Targets ${up}/${total}`);

    if (temp !== null) {
      const t = Math.round(Number(temp));
      setPill('sb-temp', t >= 90 ? 'alert' : t >= 75 ? 'warn' : '', `CPU ${t} °C`);
    }
    if (disk !== null) {
      const d = Number(disk);
      setPill('sb-disk', d >= 90 ? 'alert' : d >= 75 ? 'warn' : '', `Disk ${d.toFixed(1)} %`);
    }
  };

  const start = () => {
    refresh();
    setInterval(refresh, 15000);
    new MutationObserver(ensureBar).observe(document.body, { childList: true, subtree: true });
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', start)
    : start();
})();
