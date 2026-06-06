// === Language Toggle ===
let lang = 'en';
const toggleLang = () => {
  lang = lang === 'en' ? 'zh' : 'en';
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
  });
  document.getElementById('langBtn').textContent = lang === 'en' ? '中文' : 'English';

  // Update select placeholders
  const amountInput = document.getElementById('pgAmount');
  if (amountInput) amountInput.placeholder = lang === 'en' ? '0.50' : '0.50';

  // Update sim button
  const simBtn = document.getElementById('simBtn');
  if (simBtn) {
    simBtn.textContent = lang === 'en' ? 'Run Payment Simulation' : '运行支付模拟';
  }
};

// === Mobile Menu ===
const toggleMobileMenu = () => {
  document.querySelector('.nav-links').classList.toggle('open');
};

// === Payment Simulation ===
const runSimulation = () => {
  const amount = parseFloat(document.getElementById('pgAmount').value);
  const counterparty = document.getElementById('pgCounterparty').value;
  const jurisdiction = document.getElementById('pgJurisdiction').value;
  const log = document.getElementById('pgLog');
  const btn = document.getElementById('simBtn');

  if (!amount || amount <= 0) {
    alert(lang === 'en' ? 'Please enter a valid amount' : '请输入有效金额');
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

  // Simulate the payment flow
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

  const addLog = (msg, type = 'info') => {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${new Date().toISOString().slice(11,23)}] ${msg}`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  };

  // Step 1: Agent initiates
  addLog(lang === 'en'
    ? `Agent requesting payment: ${amount} USDC → ${counterpartyNames[counterparty]}`
    : `Agent 请求支付: ${amount} USDC → ${counterpartyNames[counterparty]}`);
  document.getElementById('flowAgent').classList.add('active');

  setTimeout(() => {
    // Step 2: x402 Handshake
    addLog(lang === 'en'
      ? `x402 handshake: HTTP 402 Payment Required received`
      : `x402 握手: 收到 HTTP 402 Payment Required`);
    addLog(`  → Wallet: 0x${randomHex(40)} (Cobo MPC)`, 'info');
    document.getElementById('flowArrow1').classList.add('active');
    document.getElementById('flowAX').classList.add('active');

    setTimeout(() => {
      // Step 3: Compliance Screening
      addLog(lang === 'en'
        ? `Running AML/CFT screening (Regtank)...`
        : `执行 AML/CFT 筛查 (Regtank)...`);
      document.getElementById('badgeScreening').classList.add('done');

      setTimeout(() => {
        const score = Math.floor(Math.random() * 20) + 1;
        addLog(`  → Risk score: ${score}/100 — ${score < 15 ? 'PASS ✅' : 'FLAGGED ⚠️'}`, score < 15 ? 'success' : 'warn');

        // Step 4: Jurisdiction routing
        addLog(lang === 'en'
          ? `Routing through ${jurisdictionNames[jurisdiction]}`
          : `通过 ${jurisdictionNames[jurisdiction]} 路由`);
        addLog(`  → Exchange rate: 1 USDC = 0.9998 USD`, 'info');
        addLog(`  → Fee: ${(amount * 0.005).toFixed(4)} USDC (0.5%)`, 'info');
        document.getElementById('badgeRoute').classList.add('done');

        setTimeout(() => {
          // Step 5: Settlement
          document.getElementById('flowArrow2').classList.add('active');
          document.getElementById('flowMerchant').classList.add('active');
          document.getElementById('flowMerchantLabel').textContent = counterpartyNames[counterparty];

          const settleAmount = amount * 0.995;
          addLog(lang === 'en'
            ? `Settled: ${settleAmount.toFixed(4)} USD → ${counterpartyNames[counterparty]}`
            : `已结算: ${settleAmount.toFixed(4)} USD → ${counterpartyNames[counterparty]}`, 'success');
          addLog(`  → tx: 0x${randomHex(64)}`, 'success');
          addLog(lang === 'en' ? '✅ Payment complete. Compliant. 4 jurisdictions.' : '✅ 支付完成。合规。覆盖 4 个司法辖区。', 'success');
          document.getElementById('badgeSettle').classList.add('done');

          // Show result
          const result = document.getElementById('pgResult');
          result.classList.remove('hidden');
          result.className = 'pg-result success';
          result.innerHTML = lang === 'en'
            ? `<strong>✅ Payment Successful</strong><br>
               Amount: <b>${amount} USDC</b><br>
               Settled: <b>${settleAmount.toFixed(4)} USD</b><br>
               Fee: <b>${(amount * 0.005).toFixed(4)} USDC</b> (0.5%)<br>
               Route: <b>${jurisdictionNames[jurisdiction]}</b><br>
               Risk: <b>${score}/100</b><br>
               <small>tx: 0x${randomHex(64)}</small>`
            : `<strong>✅ 支付成功</strong><br>
               金额: <b>${amount} USDC</b><br>
               结算: <b>${settleAmount.toFixed(4)} USD</b><br>
               手续费: <b>${(amount * 0.005).toFixed(4)} USDC</b> (0.5%)<br>
               路由: <b>${jurisdictionNames[jurisdiction]}</b><br>
               风险评分: <b>${score}/100</b><br>
               <small>tx: 0x${randomHex(64)}</small>`;

          btn.disabled = false;
          btn.textContent = lang === 'en' ? 'Run Again' : '再次运行';
        }, 600);
      }, 500);
    }, 400);
  }, 300);
};

const randomHex = (len) => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

// === Intersection Observer for animations ===
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .doc-card, .compliance-card, .arch-layer').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Trigger initial animation for visible elements
setTimeout(() => {
  document.querySelectorAll('.card, .doc-card, .compliance-card, .arch-layer').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, 200);
