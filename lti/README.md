LTI integration notes

This folder contains example LTI 1.3 configuration to help integrate courses with Moodle or another LTI-supported LMS.

What to configure
- issuer: the LMS issuer URL
- client_id: the OAuth client id
- deployment_id: the LTI deployment id
- redirect_uris: add your site's OIDC redirect URI (e.g., https://your-site.example.com/lti/launch)

Serverless example
- To complete an LTI/OIDC flow you'll need a small server endpoint to receive the OIDC redirect and exchange for an id_token. You can implement this with a tiny Node/Express function or serverless function on Netlify/Azure/AWS.

Security
- Never commit secrets. Store client secrets in environment variables or secure provider vaults.
