# ArrivalX — Business Model & Economics

## 1. Revenue Model

### Infrastructure Take Rate

ArrivalX is an infrastructure company. Revenue comes from a small percentage of every transaction flowing through the settlement layer.

| Revenue Line | Basis | Rate | Unit |
|:--|:--|:--|:--|
| Agent→API Settlement | Transaction volume | 0.50% | Per USD settled |
| Agent→Merchant Settlement | Transaction volume | 0.80-1.20% | Per USD settled |
| Agent→Agent Settlement | Per transaction | $0.10 + 15bp | Per settlement |
| FX Conversion | Notional | 15bp | Per conversion |
| CaaS Platform Fee | Monthly | $500-5,000 | Per enterprise client |

### Why These Rates Work

- **For agents**: 0.5% on a $0.50 API call = $0.0025. Irrelevant at machine scale.
- **For merchants**: 0.8-1.2% vs. 2.9%+$0.30 for traditional card processing. 60-80% cheaper.
- **For agent-to-agent**: $0.10 + 15bp vs. $15-50 for SWIFT wire. 99% cheaper.

### Revenue Composition at Scale

| Revenue Line | % of Total (Y1) | % of Total (Y3) |
|:--|:--|:--|
| Agent→API Settlement | 45% | 35% |
| Agent→Merchant Settlement | 25% | 30% |
| Agent→Agent Settlement | 15% | 20% |
| FX Conversion | 10% | 5% |
| CaaS Platform Fee | 5% | 10% |

---

## 2. Market Sizing

### TAM (Total Addressable Market)
**$1.5 trillion** — Projected autonomous AI commerce by 2030 (Juniper Research).

### SAM (Serviceable Addressable Market)
**$150 billion** — Agent payments flowing through crypto rails (vs. traditional). Conservative 10% of TAM.

### SOM (Serviceable Obtainable Market)
**$1.5 billion** — 1% of SAM. Achievable with 4-jurisdiction coverage and protocol-agnostic positioning.

### Current Market Signals

| Metric | Value | Source |
|:--|:--|:--|
| Stablecoin market cap | $318B | Feb 2026 |
| Stablecoin monthly volume | $1.8T | Feb 2026 |
| x402 payments processed | 100M+ | Since May 2025 |
| Agentic AI market | $11B | 2026 estimate |
| AI agent payment infra funding | $2B+ | Q1-Q2 2026 (Ramp + Haun + others) |

---

## 3. Unit Economics

### Per Transaction Economics (Agent→API, $1.00 USDC)

| Item | Amount | % of Revenue |
|:--|:--|:--|
| **Revenue** | $0.0050 | 100% |
| Cobo MPC wallet cost | $0.0003 | 6% |
| Regtank screening cost | $0.0002 | 4% |
| Blockchain gas (Base L2) | $0.0001 | 2% |
| FX conversion cost | $0.0002 | 4% |
| **Gross Profit** | **$0.0042** | **84%** |

### Unit Economics at Scale

At $10M monthly volume (Phase 4 target):

| Metric | Monthly | Annualized |
|:--|:--|:--|
| Revenue | $50,000 | $600,000 |
| COGS | $8,000 | $96,000 |
| Gross Profit | $42,000 | $504,000 |
| Gross Margin | 84% | 84% |
| Team (8 people) | $80,000 | $960,000 |
| Infrastructure | $5,000 | $60,000 |
| Compliance/Legal | $10,000 | $120,000 |
| **Net Burn** | **-$53,000** | **-$636,000** |

**Path to breakeven**: $25-30M monthly volume at current rates, or introduce CaaS enterprise tier at $5K/mo per client.

---

## 4. Growth Model

### Developer-Led Growth (B2D)

1. **Open-source SDK** → developers integrate in 5 minutes
2. **Sandbox environment** → free up to $100/month volume
3. **Framework partnerships** → native integrations with LangChain, AI2, Codex, MCP
4. **x402/MPP compatibility** → zero-switching-cost adoption for existing protocol users

### Enterprise Sales (B2B)

1. **CaaS product** → white-label compliance for enterprise agent platforms
2. **Audit & reporting** → enterprise procurement needs audit trails
3. **Dedicated support** → SLA for settlement latency and uptime

### Network Effects

- **More agents** → more payment volume → better FX rates → more agents
- **More protocols** → more use cases → more agents → more protocols
- **More jurisdictions** → more counterparties → more transactions → more jurisdictions

---

## 5. Comparative Advantage

### vs. Traditional Payment Processors

| Metric | Stripe (Card) | ArrivalX (Agent) |
|:--|:--|:--|
| Per-transaction fee | 2.9% + $0.30 | 0.5% |
| Micropayment viable? | ❌ ($0.33 min fee) | ✅ ($0.0025 on $0.50) |
| Agent-native? | ❌ (requires human auth) | ✅ (wallet = keypair) |
| Cross-border | 1% FX + correspondent banking | 0.15% FX + crypto rails |
| Settlement time | T+2 | ~3 seconds |
| Operating hours | Business days | 24/7/365 |

### vs. Crypto-Native Competitors

| Metric | MoonPay Agents | ArrivalX |
|:--|:--|:--|
| Wallet custody | Non-custodial (user manages keys) | Cobo MPC (managed) |
| Fiat off-ramp | ❌ | ✅ (4 corridors) |
| Compliance automation | ❌ | ✅ (auto SAR, multi-jurisdiction) |
| Protocol support | — | x402, MPP, AP2 |
| Developer UX | Crypto knowledge required | 5 lines, no crypto knowledge |

---

## 6. Risk Factors

| Risk | Probability | Impact | Mitigation |
|:--|:--|:--|:--|
| Stripe/Coinbase launches competing compliance layer | Medium | High | Be first, build developer ecosystem, seek acquisition |
| Regulatory crackdown on crypto MSBs | Low-Medium | High | Diversify jurisdictions, pursue EMI/banking lite licenses |
| Agent payment adoption slower than projected | Medium | Medium | CaaS revenue diversifies beyond pure transaction fees |
| Key partner failure (Cobo, Regtank) | Low | Medium | Multi-vendor architecture, migration plan documented |
| Security breach | Low | Very High | Insurance, cold storage, penetration testing, bug bounty |

---

## 7. Funding & Valuation

### Seed Round Target (Month 7-9)

| Parameter | Target |
|:--|:--|
| Raise | $5-8M |
| Pre-money valuation | $25-35M |
| Use of funds | Team (60%), Infrastructure (20%), Compliance/Legal (20%) |
| Milestone to next round | $1M+ monthly volume, 500+ developers, 3+ framework integrations |

### Comparable Transactions

| Company | Round | Amount | Valuation | What They Do |
|:--|:--|:--|:--|:--|
| Sapiom | Seed | $15.75M | ~$60M | Agent API payments |
| Fasset | Series B | $51M | ~$200M+ | Stablecoin neobank, $32B annual volume |
| Ramp | Series F | $750M | $44B | Agent payment infrastructure (broader) |
| MoonPay | — | — | $3.4B (last known) | Crypto payments (expanding to agents) |

---

*Version 1.0 · June 2026*
