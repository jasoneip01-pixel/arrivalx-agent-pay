# ArrivalX — Agent Integration Guide

> **Give your AI agent a bank account in 5 minutes.**

## Quickstart

### 1. Install

```bash
npm install @arrivalx/agent-sdk
# or
pip install arrivalx-agent-sdk
# or
go get github.com/arrivalx/agent-sdk-go
```

### 2. Get API Key

```bash
curl -X POST https://api.arrivalx.money/v0/developers/register \
  -H "Content-Type: application/json" \
  -d '{"email": "dev@yourcompany.io", "name": "Your Agent Name"}'
# → {"api_key": "ax_live_...", "developer_id": "dev_..."}
```

### 3. Create Agent Wallet

```javascript
import { ArrivalX } from '@arrivalx/agent-sdk';

const ax = new ArrivalX({ apiKey: process.env.AX_API_KEY });

// Create a wallet for your agent
const wallet = await ax.wallets.create({
  label: 'my-research-agent',
  jurisdiction: 'US',       // or AU, HK, CA
  spendingLimit: '1000.00', // daily limit in USDC
});

console.log(wallet.address);
// → 0x7a9b...3f2c (Cobo MPC, fully managed)
```

### 4. Make a Payment

```javascript
// Your agent pays an API service via x402
const payment = await wallet.pay({
  to: 'api.dataprovider.io',
  amount: '0.50',
  currency: 'USDC',
  protocol: 'x402',         // auto-detected if omitted
});

console.log(payment.status);
// → "settled"
console.log(payment.txHash);
// → "0x..."
```

### 5. That's It

No gas fee management. No key custody. No blockchain RPC endpoints. No compliance paperwork. ArrivalX handles all of it.

---

## API Reference

### Authentication

All requests require an API key in the header:

```http
Authorization: Bearer ax_live_YOUR_API_KEY
```

### Base URL

```
https://api.arrivalx.money/v0
```

### Endpoints

#### Wallets

```http
POST   /wallets                    Create an agent wallet
GET    /wallets                    List all wallets
GET    /wallets/:id                Get wallet details
PATCH  /wallets/:id                Update wallet config
DELETE /wallets/:id                Archive wallet
```

**Create Wallet Request:**

```json
{
  "label": "my-agent-wallet",
  "jurisdiction": "US",
  "spending_limit_daily": "1000.00",
  "spending_limit_per_txn": "100.00",
  "allowed_counterparties": ["*"],
  "webhook_url": "https://myapp.io/webhooks/arrivalx"
}
```

**Response:**

```json
{
  "id": "wal_abc123",
  "address": "0x7a9b8c3d...",
  "chain": "base",
  "currency": "USDC",
  "balance": "0.00",
  "status": "active",
  "jurisdiction": "US",
  "created_at": "2026-06-06T08:00:00Z"
}
```

#### Payments

```http
POST   /payments                   Initiate payment
GET    /payments/:id               Get payment status
GET    /payments                   List payments (filterable)
```

**Initiate Payment Request:**

```json
{
  "wallet_id": "wal_abc123",
  "to": "api.dataprovider.io",
  "amount": "0.50",
  "currency": "USDC",
  "protocol": "x402",
  "idempotency_key": "unique-key-123"
}
```

**Response:**

```json
{
  "id": "pay_xyz789",
  "status": "processing",
  "amount": "0.50",
  "currency": "USDC",
  "fee": "0.0025",
  "settlement_amount": "0.4975",
  "settlement_currency": "USD",
  "protocol": "x402",
  "jurisdiction_routed": "US",
  "risk_score": 8,
  "tx_hash": null,
  "created_at": "2026-06-06T08:01:00Z"
}
```

**Payment Statuses:** `processing` → `screening` → `routing` → `settling` → `settled` | `failed` | `blocked`

#### Compliance

```http
GET    /compliance/status          Get compliance health
GET    /compliance/reports/:id     Download compliance report
```

---

## Protocol Support

### x402 (HTTP 402 Payment Required)

ArrivalX acts as a compliant x402 payment processor. When your agent hits a `402 Payment Required` response:

1. ArrivalX detects the x402 challenge
2. Creates and signs the payment from your agent's Cobo MPC wallet
3. Resubmits the request with the payment proof
4. Returns the service response to your agent

```javascript
// Automatic x402 handling
const response = await ax.fetch('https://api.service.io/data', {
  method: 'POST',
  body: { query: 'latest prices' },
  // ArrivalX intercepts 402, pays, retries—all transparent
});
```

### MPP (Stripe Machine Payments Protocol)

For merchant/enterprise agent payments via traditional card networks:

```javascript
const payment = await wallet.pay({
  to: 'merchant@shop.io',
  amount: '29.99',
  currency: 'USD',
  protocol: 'mpp',
});
// ArrivalX handles: USDC → fiat conversion → MPP settlement → merchant receives USD
```

### AP2 (Cobo Agent Payment Protocol)

For agent-to-agent direct settlement:

```javascript
const payment = await wallet.pay({
  to: 'agent://market.agents/best-data-provider',
  amount: '5.00',
  currency: 'USDC',
  protocol: 'ap2',
});
```

---

## Compliance & Routing

### Jurisdiction Routing Rules

Transactions are automatically routed through the optimal licensed jurisdiction:

| Agent Location | Counterparty Location | Routed Through | Reason |
|:--|:--|:--|:--|
| US | US | 🇺🇸 FinCEN MSB | Domestic, lowest latency |
| US | APAC | 🇭🇰 MSO | Asia corridor |
| APAC | US | 🇦🇺 DCE | US-friendly APAC hub |
| APAC | APAC | 🇭🇰 MSO | Regional efficiency |
| CA | US | 🇨🇦 FINTRAC | North American redundancy |
| Any | EU | 🇭🇰 MSO | No EU license (yet) |

### Compliance Guarantees

Every payment processed through ArrivalX:

| Check | Method | Result |
|:--|:--|:--|
| **KYB** | Developer identity verification (Regtank) | Required for API key |
| **Agent KYC** | Agent-to-wallet binding + transaction patterns | Continuous |
| **Sanctions Screening** | OFAC, UN, EU, HK, AU consolidated lists | Per transaction |
| **AML/CFT** | Regtank real-time risk scoring | Per transaction |
| **SAR Filing** | Automatic suspicious activity reporting | Triggered at risk > 75 |
| **Audit Trail** | Immutable transaction logs with compliance metadata | All transactions |

---

## SDK Examples

### Python

```python
from arrivalx import ArrivalX

ax = ArrivalX(api_key="ax_live_...")

# Create wallet
wallet = ax.wallets.create(
    label="my-python-agent",
    jurisdiction="US",
    spending_limit_daily="500.00"
)

# Pay for API access
payment = wallet.pay(
    to="api.dataprovider.io",
    amount="0.50",
    currency="USDC"
)

print(f"Payment {payment.id}: {payment.status}")
print(f"Fee: {payment.fee} USDC")
print(f"Settled: {payment.settlement_amount} {payment.settlement_currency}")
```

### Go

```go
package main

import (
    "fmt"
    "github.com/arrivalx/agent-sdk-go"
)

func main() {
    ax := arrivalx.NewClient("ax_live_...")

    wallet, _ := ax.Wallets.Create(arrivalx.CreateWalletParams{
        Label:            "my-go-agent",
        Jurisdiction:     "US",
        SpendingLimitDay: "1000.00",
    })

    payment, _ := wallet.Pay(arrivalx.PayParams{
        To:       "api.service.io",
        Amount:   "1.00",
        Currency: "USDC",
    })

    fmt.Printf("Payment %s: %s (fee: %s USDC)\n",
        payment.ID, payment.Status, payment.Fee)
}
```

### Webhook Events

```json
{
  "event": "payment.settled",
  "data": {
    "payment_id": "pay_xyz789",
    "wallet_id": "wal_abc123",
    "amount": "0.50",
    "currency": "USDC",
    "fee": "0.0025",
    "settlement_amount": "0.4975",
    "settlement_currency": "USD",
    "protocol": "x402",
    "tx_hash": "0x...",
    "settled_at": "2026-06-06T08:01:03Z"
  }
}
```

---

## Rate Limits

| Tier | Requests/min | Wallets | Monthly Volume |
|:--|:--|:--|:--|
| Sandbox | 30 | 5 | $100 |
| Developer | 300 | 50 | $10,000 |
| Business | 1,000 | 500 | $100,000 |
| Enterprise | Custom | Custom | Custom |

---

## Support

- 📧 Email: dev@arrivalx.money
- 💬 Discord: [ArrivalX Developers](https://discord.gg/arrivalx)
- 📖 Status: [status.arrivalx.money](https://status.arrivalx.money)

---

*API Version: v0 (Beta) · Last Updated: June 2026*
