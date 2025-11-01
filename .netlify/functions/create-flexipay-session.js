// Netlify Function scaffold: create a Flexipay checkout/session
// NOTE: This is a scaffold with placeholders. Do NOT commit real secrets.
// To use:
// 1. Set environment variables in your deploy platform: FLEXIPAY_API_KEY, FLEXIPAY_MERCHANT_ID, FLEXIPAY_API_BASE (optional)
// 2. Deploy to Netlify (or adapt to your provider's function format).
// 3. The function expects a POST with JSON { amount } in smallest currency unit (e.g., 100000 for UGX 100,000)

const fetch = require('node-fetch'); // Netlify provides fetch in newer runtimes; keep this for local tests

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const amount = body.amount;
  if (!amount || typeof amount !== 'number') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing amount (number)' }) };
  }

  // Read env vars
  const API_KEY = process.env.FLEXIPAY_API_KEY || '';
  const MERCHANT_ID = process.env.FLEXIPAY_MERCHANT_ID || '';
  const API_BASE = process.env.FLEXIPAY_API_BASE || 'https://api.flexipay.example.com'; // replace with Flexipay's real base URL

  if (!API_KEY || !MERCHANT_ID) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Flexipay not configured on server (set FLEXIPAY_API_KEY and FLEXIPAY_MERCHANT_ID)' }) };
  }

  try {
    // This is a generic example. Replace endpoint, headers and body to match Flexipay's real API.
    const payload = {
      merchant_id: MERCHANT_ID,
      amount: amount,
      currency: 'UGX',
      description: 'TEN Fund donation',
      // success_url: 'https://your-site.example.com/ten-fund-success',
      // cancel_url: 'https://your-site.example.com/ten-fund-cancel'
    };

    const resp = await fetch(`${API_BASE}/v1/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 502, body: JSON.stringify({ error: 'Flexipay API error', details: text }) };
    }

    const data = await resp.json();

    // Expecting something like { checkout_url: 'https://checkout.flexipay/...' } from the provider
    const checkoutUrl = data.checkout_url || data.url || data.redirect_url;
    if (!checkoutUrl) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Unexpected response from Flexipay', details: data }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: checkoutUrl })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', details: err.message }) };
  }
};
