document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('homelab-status-bar')) return;

  const page = document.getElementById('page_container');
  if (!page) return;

  const bar = document.createElement('div');
  bar.id = 'homelab-status-bar';

  const left = document.createElement('div');
  left.className = 'status-group';
  left.innerHTML = `
    <span class="status-pill primary"><span class="dot"></span> All systems nominal</span>
    <span class="status-pill"><span class="dot"></span> 0 alerts</span>
    <span class="status-pill warn"><span class="dot"></span> Monitoring active</span>
  `;

  const right = document.createElement('div');
  right.className = 'status-group';
  right.innerHTML = `
    <span class="status-pill"><span class="dot"></span> 192.168.1.118</span>
    <span class="status-pill"><span class="dot"></span> 14.09.2026</span>
  `;

  bar.append(left, right);
  page.insertBefore(bar, page.firstChild);
});
