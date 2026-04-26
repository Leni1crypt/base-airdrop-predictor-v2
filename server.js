require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Используем Blockscout API, который 100% совместим с форматом Basescan
// и полностью бесплатен для сети Base (в отличие от Etherscan V2)
const BASESCAN_BASE = 'https://base.blockscout.com/api';

// ─── Ranks ────────────────────────────────────────────────────────────────────
const RANKS = [
  { min: 0,    label: '🪦 Exit Liquidity Intern',     comment: 'ser this is not your season. ngmi.' },
  { min: 20,   label: '😶 Airdrop Hopeful',           comment: 'you heard about airdrops and made one tx. brave.' },
  { min: 40,   label: '🌱 Onchain Tourist',           comment: 'visited Base once. took a selfie. left.' },
  { min: 70,   label: '🧢 Degen Apprentice',          comment: 'you know what gas fees are now. progress.' },
  { min: 110,  label: '🐸 Mid Curve Enjoyer',         comment: 'solid activity. you follow every alpha channel.' },
  { min: 160,  label: '⚡ Based Farmer',              comment: "you farm protocols you've never heard of. respect." },
  { min: 220,  label: '🎯 Airdrop Sniper',            comment: "surgical precision. you don't miss drops." },
  { min: 290,  label: '🦎 DeFi Lizard',               comment: 'you sleep in liquidity pools. no social life. winning.' },
  { min: 370,  label: '🧠 Protocol Veteran',          comment: "you've seen rugs and kept building. gigabrain." },
  { min: 460,  label: '🚀 Top Wallet Enjoyer',        comment: 'Coinbase probably knows your wallet address.' },
  { min: 560,  label: '💎 Diamond Hands Operator',    comment: 'you were here before Base launched. legend.' },
  { min: 680,  label: '🔱 Onchain OG',                comment: 'the ecosystem runs because of wallets like yours.' },
  { min: 820,  label: '🐳 Whale-Tier Degen',          comment: 'protocols launch just to get your volume.' },
  { min: 1000, label: "👑 Coinbase's Favorite Child", comment: 'Brian Armstrong cooks for you personally. GFI.' },
  { min: 1250, label: '🌕 Base God',                  comment: 'you ARE the airdrop. everything bows.' },
];

function getRank(score) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (score >= r.min) rank = r;
  }
  return rank;
}

function calcProbability(score) {
  // Более плавный рост вероятности, 99% достигается только при 1200+ pts
  return Math.min(99, Math.max(1, Math.round((score / 1200) * 100)));
}

function calcDropRange(score) {
  if (score < 40)   return '$0';
  if (score < 110)  return '$50 – $150';
  if (score < 220)  return '$150 – $500';
  if (score < 370)  return '$500 – $1,200';
  if (score < 560)  return '$1,200 – $2,500';
  if (score < 820)  return '$2,500 – $8,000';
  if (score < 1250) return '$8,000 – $20,000';
  return '$20,000+';
}

// ─── Scanner helper ──────────────────────────────────────────────────────────
async function fetchScanner(params) {
  const qs = new URLSearchParams(params);
  const url = `${BASESCAN_BASE}?${qs}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Scanner HTTP ${res.status}`);
  const json = await res.json();

  if (json.status === '0') {
    if (json.message === 'No transactions found') return [];
    throw new Error(`Scanner error: ${json.message} — ${json.result}`);
  }
  return json.result;
}

// ─── /analyze endpoint ────────────────────────────────────────────────────────
app.post('/analyze', async (req, res) => {
  const { address } = req.body;

  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }

  try {
    // 1) Fetch up to 10 000 normal txs sorted oldest-first
    const txs = await fetchScanner({
      module:     'account',
      action:     'txlist',
      address,
      startblock: '0',
      endblock:   '99999999',
      sort:       'asc',
      offset:     '10000',
      page:       '1',
    });

    const tx_count = txs.length;

    // Unique contracts = unique `to` addresses that are not the wallet itself
    const contractSet = new Set();
    for (const tx of txs) {
      const to = (tx.to || '').toLowerCase();
      if (to && to !== address.toLowerCase()) contractSet.add(to);
    }
    const unique_contracts = contractSet.size;

    // Wallet age = days since first tx timestamp
    let wallet_age_days = 0;
    if (txs.length > 0) {
      const firstTs = parseInt(txs[0].timeStamp, 10) * 1000;
      wallet_age_days = Math.floor((Date.now() - firstTs) / (1000 * 60 * 60 * 24));
    }

    // 2) Score
    // Новая формула: корень из tx и age (diminishing returns), но линейно для unique_contracts
    let score = Math.floor(Math.sqrt(tx_count) * 1.5 + unique_contracts * 2.5 + Math.sqrt(wallet_age_days) * 2);
    
    // Бонусы: сложнее получить, но дают ощутимый буст
    if (unique_contracts > 30) score += 20;
    if (unique_contracts > 80) score += 50;
    if (wallet_age_days > 180) score += 30;
    if (tx_count > 1000) score += 30;
    score = Math.round(score);

    // 3) Result
    const rankObj     = getRank(score);
    const probability = calcProbability(score);
    const drop_range  = calcDropRange(score);

    return res.json({
      address,
      metrics: { tx_count, unique_contracts, wallet_age_days },
      score,
      rank:     rankObj.label,
      comment:  rankObj.comment,
      probability,
      drop_range,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Vercel Serverless Function compatibility
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}
