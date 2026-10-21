'use strict';
(() => {
  const params = new URLSearchParams(window.location.search);
  const state = params.get('state');
  const code = params.get('code');
  const error = params.get('error');
  // Remove authorization details before rendering or loading anything else.
  window.history.replaceState(null, '', window.location.pathname);
  if (!window.opener || !state || !/^[\w-]{43}$/.test(state) || (!code && !error)) {
    document.getElementById('status').textContent = 'Return to Mikloset and start Google sign-in again.';
    return;
  }
  window.opener.postMessage({ type: 'mikloset-google', state, code, error }, window.location.origin);
  document.getElementById('status').textContent = 'You can close this window and return to Mikloset.';
  // Give the parent time to receive the message before its close poll runs.
  window.setTimeout(() => window.close(), 1000);
})();
