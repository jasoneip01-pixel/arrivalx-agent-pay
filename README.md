# ArrivalX — Settlement Layer for the Agent Economy

> **Licensed. Compliant. 5 Lines of Code.**

ArrivalX is the compliance settlement infrastructure for AI agent payments. We provide a protocol-agnostic gateway that lets any AI agent pay anyone, anywhere—with full regulatory compliance across 4 licensed jurisdictions.

## Architecture

```
┌──────────────────────────────────────────────┐
│   L3 · Agent Payment SDK & API                │
│   x402 Gateway · MPP Adapter · AP2 Bridge    │
├──────────────────────────────────────────────┤
│   L2 · Compliance Settlement Engine ⚡        │
│   Jurisdiction Router · Identity · AML/CFT   │
├──────────────────────────────────────────────┤
│   L1 · Licensed Money Transmission           │
│   🇦🇺 DCE · 🇺🇸 MSB · 🇭🇰 MSO · 🇨🇦 MSB       │
└──────────────────────────────────────────────┘
```

## Documentation

| Document | Content |
|----------|---------|
| [Product Definition Spec](docs/PRODUCT.md) | Positioning, competition, roadmap, unit economics |
| [Agent Integration Guide](docs/API.md) | Quickstart, API reference, route rules, compliance |
| [Business Model](docs/BUSINESS.md) | Revenue streams, TAM/SAM/SOM, fee structure |

## Quick Links

- **Live Demo**: [GitHub Pages](https://jasoneip01-pixel.github.io/arrivalx-agent-pay)
- **Source**: Private repository
- **Contact**: support@arrivalx.money

## Licenses

| Jurisdiction | License | Regulator |
|:--|:--|:--|
| 🇦🇺 Australia | DCE | AUSTRAC |
| 🇺🇸 United States | MSB | FinCEN |
| 🇭🇰 Hong Kong | MSO | HK Customs |
| 🇨🇦 Canada | MSB | FINTRAC |

## Tech Stack

- **Wallet**: Cobo MPC
- **Compliance**: Regtank (KYB/KYC/AML), Beosin (Audit)
- **Liquidity**: HashKey Global, WSPN
- **Legal**: Man Kun Law Firm

## Deployment (Dual Repo)

```
Source (private): jasoneip01-pixel/arrivalx-agent-pay-source
Deploy (public):  jasoneip01-pixel/arrivalx-agent-pay
```

```bash
./deploy.sh  # Builds and force-pushes to public deploy repo
```

---

*Stable Chain Fintech Limited · 2026*
