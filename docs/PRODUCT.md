# ArrivalX — Product Definition Specification

## 1. Elevator Pitch

**"AI agents are effectively unbanked. $1.5 trillion in autonomous commerce has no compliance layer. ArrivalX is the licensed settlement infrastructure that lets any agent pay anyone, anywhere—with full regulatory compliance. Four live licenses. Working product. 5 lines to integrate."**

## 2. Problem Statement

### Current State
Every payment rail in production today assumes a **human** is authorizing the transaction:
- Credit cards require cardholder verification (3DS, CVV, biometrics)
- Bank transfers require human-initiated KYC and manual authorization
- Payment processors require multi-factor authentication from a person

AI agents **cannot** open bank accounts. They cannot pass KYC. They cannot click "Confirm" in a banking app. Yet they need to pay for API access, compute resources, data, and services from other agents.

### The Gap
- **x402** provides the protocol (HTTP 402 Payment Required + USDC settlement) — 100M+ payments processed
- **Stripe MPP** provides the protocol + card network integration
- **MoonPay Agents** provides non-custodial wallets
- **Nobody** provides the **compliance settlement layer** — multi-jurisdiction, licensed, with fiat on/off ramps

### Why ArrivalX
ArrivalX holds **4 money transmission licenses** (AU DCE, US MSB, HK MSO, CA MSB). These are exactly the license types needed for agent payment settlement—not deposit-taking (which agents don't need), but money transmission and currency exchange (which agents need constantly).

## 3. Product Definition

### 3.1 Core Product
**ArrivalX Agent Payment Gateway** — a protocol-agnostic, compliance-first settlement infrastructure.

### 3.2 Key Capabilities

| Capability | Description | Status |
|:--|:--|:--|
| x402 Gateway | Receive HTTP 402 requests, verify payment, settle in USDC | Roadmap |
| MPP Adapter | Integrate with Stripe MPP for card-network agent payments | Roadmap |
| AP2 Bridge | Agent-to-agent settlement via Cobo's AP2 protocol | Roadmap |
| Compliance Router | Auto-route transactions through optimal licensed jurisdiction | Roadmap |
| Agent Identity Binding | Link developer identity → agent → wallet → compliance profile | Roadmap |
| AML/CFT Screening | Real-time Regtank integration, automatic SAR filing | Roadmap |
| Fiat On/Off Ramp | USDC ↔ USD/EUR/HKD/CAD settlement | Roadmap |
| Unified SDK | Python/JS/Go libraries, 5-line integration | Roadmap |
| Developer Dashboard | Wallet management, transaction monitoring, compliance reports | Roadmap |
| CaaS (Compliance-as-a-Service) | White-label compliance layer for other agent platforms | Future |

### 3.3 What ArrivalX Is NOT
- ❌ A blockchain or L2
- ❌ A new payment protocol (we support existing protocols)
- ❌ A consumer neobank or wallet app
- ❌ A deposit-taking institution (and we don't need to be)

## 4. Competitive Analysis

### 4.1 Positioning Matrix

| Player | Protocol | Wallet | Compliance | Fiat Ramp | Licenses |
|:--|:--|:--|:--|:--|:--|
| **ArrivalX** | Multi (x402/MPP/AP2) | Cobo MPC | ✅ Multi-jurisdiction | ✅ 4 corridors | 4 live |
| Coinbase x402 | x402 only | CDP | ❌ Protocol only | ❌ | — |
| Stripe MPP | MPP only | — | ❌ Protocol only | Via Stripe | — |
| MoonPay Agents | — | Non-custodial | ❌ | ❌ Crypto only | — |
| Sapiom | Custom | — | ❌ | ❌ | None (Seed) |
| AWS AgentCore | x402 | Via Coinbase | ❌ | ❌ | — |

### 4.2 Moat Analysis

| Moat Type | Strength | Time to Replicate |
|:--|:--|:--|
| Regulatory (4 licenses) | 🔴 High | 12-18 months |
| Multi-protocol integration | 🟡 Medium | 3-6 months |
| Compliance engine | 🟡 Medium | 4-8 months |
| Developer ecosystem | 🟢 Low (not yet built) | 2-4 months |

**Primary moat**: Regulatory licenses. Code can be copied. Licenses cannot.

## 5. Target Users

### Primary: AI Agent Developers
- Building agents on LangChain, AI2, Codex, MCP
- Need agents to pay for APIs, compute, data
- Currently using: manual pre-funding, API keys, or nothing
- Pain: agents hit paywalls and stop

### Secondary: API/Service Providers
- SaaS tools, data APIs, compute providers
- Want to monetize agent traffic without managing KYC
- Pain: agents can't sign up for paid plans

### Tertiary: Enterprise Platforms
- Companies deploying agent fleets internally
- Need spending controls, audit trails, compliance
- Pain: no off-the-shelf agent payment governance

## 6. Business Model

See [BUSINESS.md](BUSINESS.md) for detailed economics.

| Revenue Line | Model | Rate |
|:--|:--|:--|
| Agent→API Settlement | % of transaction | 0.5% |
| Agent→Merchant Settlement | % of transaction | 0.8-1.2% |
| Agent→Agent Settlement | Per-txn + FX spread | $0.10 + 15bp |
| CaaS | Monthly SaaS | $500-5,000/mo |

## 7. Roadmap

### Phase 1: MVP (Months 1-3)
- [ ] Agent Payment API v0 (REST + WebSocket)
- [ ] x402 compatible gateway
- [ ] Agent wallet creation + permission binding (Cobo MPC)
- [ ] Agent KYB flow v1 (developer → agent → wallet)
- **Milestone**: 100 developers can create agent wallets and test payments

### Phase 2: Multi-Protocol + Fiat (Months 4-6)
- [ ] MPP protocol adapter
- [ ] AP2 protocol adapter
- [ ] Fiat off-ramp (USDC → USD/EUR/HKD/CAD)
- [ ] Compliance Engine v1 (auto jurisdiction routing)
- **Milestone**: First real Agent↔Agent cross-border payment

### Phase 3: Developer Ecosystem (Months 7-9)
- [ ] SDK release (Python/JS/Go)
- [ ] Integration with 3-5 agent frameworks
- [ ] Seed round ($5-8M at $25-35M pre)
- **Milestone**: 500+ developers, $1M+ monthly volume

### Phase 4: Scale (Months 10-12)
- [ ] CaaS product line
- [ ] Enterprise dashboard + audit reports
- [ ] 1-2 additional licenses (Singapore MPI or Dubai VASP)
- [ ] Series A preparation
- **Milestone**: $10M+ monthly volume, 50+ enterprise clients

## 8. Falsification Conditions

This thesis is **falsified** if any of the following occur within 6 months:

1. Stripe or Coinbase launches a licensed settlement layer covering ≥3 jurisdictions
2. Agent payment volume on x402/MPP stagnates (no 2x growth QoQ)
3. Regulatory change makes crypto-native money transmission infeasible in ≥2 of our 4 jurisdictions
4. No organic developer interest (≤10 API key requests in first month of public beta)

## 9. Acquisition Logic

If ArrivalX proves PMF for the agent compliance settlement layer, the most likely exit is acquisition by:
- **Stripe**: Needs compliance layer for MPP to go global
- **Coinbase**: Needs multi-jurisdiction settlement for x402
- **Ramp**: $44B company betting on agent payments, needs infra

Target: 18-24 months to acquisition signal.

---

*Version 1.0 · June 2026*
