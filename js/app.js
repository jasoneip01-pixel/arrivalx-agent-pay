// === ArrivalX Agent Pay — App Controller ===
(function() {
'use strict';

// --- State ---
let lang = 'en';
let simRunning = false;

// --- Language Toggle ---
window.toggleLang = function() {
  lang = lang === 'en' ? 'zh' : 'en';
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
  });
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.textContent = lang === 'en' ? '中文' : 'English';

  // Update sim button if exists
  const simBtn = document.getElementById('simBtn');
  if (simBtn && !simRunning) {
    simBtn.textContent = lang === 'en' ? 'Run Payment Simulation' : '运行支付模拟';
  }
};

// --- Mobile Menu ---
window.toggleMobileMenu = function() {
  document.querySelector('.nav-links').classList.toggle('open');
};

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Close mobile menu on outside click / scroll
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav-links');
  const btn = document.querySelector('.mobile-menu-btn');
  if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const nav = document.querySelector('.nav-links');
      if (nav.classList.contains('open')) nav.classList.remove('open');
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// --- Payment Simulation ---
window.runSimulation = function() {
  if (simRunning) return;
  simRunning = true;

  const amountInput = document.getElementById('pgAmount');
  const counterparty = document.getElementById('pgCounterparty').value;
  const jurisdiction = document.getElementById('pgJurisdiction').value;
  const log = document.getElementById('pgLog');
  const btn = document.getElementById('simBtn');

  const amount = parseFloat(amountInput.value);
  if (!amount || amount <= 0) {
    simRunning = false;
    return;
  }

  // Reset UI
  document.getElementById('pgStep2').classList.remove('hidden');
  document.getElementById('pgVisualPlaceholder').classList.add('hidden');
  document.getElementById('pgVisualFlow').classList.remove('hidden');
  document.getElementById('pgBadges').classList.remove('hidden');
  document.getElementById('pgResult').classList.add('hidden');
  log.innerHTML = '';

  // Reset flow nodes
  ['flowAgent','flowAX','flowMerchant'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  ['flowArrow1','flowArrow2'].forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  ['badgeScreening','badgeRoute','badgeSettle'].forEach(id => {
    document.getElementById(id).classList.remove('done');
  });

  btn.disabled = true;
  btn.textContent = lang === 'en' ? 'Processing...' : '处理中...';

  // Scroll to log on mobile
  if (window.innerWidth < 1024) {
    document.getElementById('pgStep2').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const counterpartyNames = {
    api: 'api.dataprovider.io',
    compute: 'gpu.rent',
    agent: 'agent.market',
    saas: 'saas.vendor.io'
  };

  const jurisdictionNames = {
    US: 'United States (FinCEN MSB)',
    AU: 'Australia (AUSTRAC DCE)',
    HK: 'Hong Kong (HK MSO)',
    CA: 'Canada (FINTRAC MSB)'
  };

  const addLog = (msg, type) => {
    const line = document.createElement('div');
    line.className = 'log-line' + (type ? ' ' + type : '');
    line.textContent = '[' + new Date().toISOString().slice(11,23) + '] ' + msg;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  };

  // Step 1
  addLog('Agent requesting payment: ' + amount + ' USDC → ' + counterpartyNames[counterparty]);
  document.getElementById('flowAgent').classList.add('active');

  setTimeout(() => {
    // Step 2: x402
    addLog('x402 handshake: HTTP 402 Payment Required received', 'info');
    addLog('  → Wallet: 0x' + randomHex(40) + ' (Cobo MPC)', 'info');
    document.getElementById('flowArrow1').classList.add('active');
    document.getElementById('flowAX').classList.add('active');

    setTimeout(() => {
      // Step 3: Screening
      addLog('Running AML/CFT screening (Regtank)...', 'info');
      document.getElementById('badgeScreening').classList.add('done');

      setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 1;
        addLog('  → Risk score: ' + score + '/100 — ' + (score < 15 ? 'PASS ✅' : 'FLAGGED ⚠️'), score < 15 ? 'success' : 'warn');

        // Step 4: Routing
        addLog('Routing through ' + jurisdictionNames[jurisdiction], 'info');
        addLog('  → Exchange rate: 1 USDC = 0.9998 USD', 'info');
        addLog('  → Fee: ' + (amount * 0.005).toFixed(4) + ' USDC (0.5%)', 'info');
        document.getElementById('badgeRoute').classList.add('done');

        setTimeout(() => {
          // Step 5: Settlement
          document.getElementById('flowArrow2').classList.add('active');
          document.getElementById('flowMerchant').classList.add('active');
          document.getElementById('flowMerchantLabel').textContent = counterpartyNames[counterparty];

          const settleAmount = (amount * 0.995).toFixed(4);
          const fee = (amount * 0.005).toFixed(4);
          const txHex = randomHex(64);

          addLog('Settled: ' + settleAmount + ' USD → ' + counterpartyNames[counterparty], 'success');
          addLog('  → tx: 0x' + txHex, 'success');
          addLog('✅ Payment complete. Compliant. 4 jurisdictions.', 'success');
          document.getElementById('badgeSettle').classList.add('done');

          // Show result
          const result = document.getElementById('pgResult');
          result.classList.remove('hidden', 'error-box');
          result.className = 'pg-result success';
          result.innerHTML = (lang === 'en'
            ? '<strong>✅ Payment Successful</strong><br>'
              + 'Amount: <b>' + amount + ' USDC</b><br>'
              + 'Settled: <b>' + settleAmount + ' USD</b><br>'
              + 'Fee: <b>' + fee + ' USDC</b> (0.5%)<br>'
              + 'Route: <b>' + jurisdictionNames[jurisdiction] + '</b><br>'
              + 'Risk: <b>' + score + '/100</b><br>'
              + '<small>tx: 0x' + txHex + '</small>'
            : '<strong>✅ 支付成功</strong><br>'
              + '金额: <b>' + amount + ' USDC</b><br>'
              + '结算: <b>' + settleAmount + ' USD</b><br>'
              + '手续费: <b>' + fee + ' USDC</b> (0.5%)<br>'
              + '路由: <b>' + jurisdictionNames[jurisdiction] + '</b><br>'
              + '风险评分: <b>' + score + '/100</b><br>'
              + '<small>tx: 0x' + txHex + '</small>');

          btn.disabled = false;
          btn.textContent = lang === 'en' ? 'Run Again' : '再次运行';
          simRunning = false;

          // Scroll to result on mobile
          if (window.innerWidth < 768) {
            result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 600);
      }, 500);
    }, 400);
  }, 300);
};

// --- Utilities ---
function randomHex(len) {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// --- Scroll-Activated Animations ---
const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -30px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .doc-card, .compliance-card, .arch-layer, .partner').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Initial reveal for above-fold
setTimeout(() => {
  document.querySelectorAll('.card, .doc-card, .compliance-card, .arch-layer, .partner').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 300);

// --- Nav shadow on scroll ---
const nav = document.getElementById('nav');
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 10) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
  lastScrollY = scrollY;
}, { passive: true });

})();
