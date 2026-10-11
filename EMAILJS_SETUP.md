# EmailJS Contact Form Setup

The contact form sends two emails through EmailJS:

1. An owner notification to Naveen when a visitor submits the form.
2. An acknowledgement to the visitor.

The browser can only send these emails after the EmailJS service, templates, and public key are configured.

## Current configuration

| Purpose | Environment variable | Current EmailJS ID |
| --- | --- | --- |
| Gmail service | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_7jktasp` |
| Owner notification | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN` | `template_grhlujf` |
| Visitor acknowledgement | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO` | `template_psfmd3n` |
| Browser public key | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Copy this from EmailJS → Account → API Keys |

Create `.env.local` for local development. This file is ignored by Git.

```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_7jktasp
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN=template_grhlujf
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO=template_psfmd3n
```

Restart `npm run dev` whenever `.env.local` changes.

## Required template settings

EmailJS resolves the recipient from the **To Email** field inside each template. An empty field causes the provider error: `The recipients address is empty (422)`.

### Owner notification — `template_grhlujf` (`Auto-Reply` in EmailJS)

Configure this template in EmailJS → Email Templates:

- **To Email:** `naveennagendiran321@gmail.com`
- **Reply To:** `{{reply_to}}`
- **Subject:** `New portfolio message from {{from_name}}`

Suggested body:

```text
Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

Using the fixed owner address here prevents a visitor from changing the destination of the owner notification.

### Visitor acknowledgement — `template_psfmd3n` (`Welcome` in EmailJS)

- **To Email:** `{{email}}` or `{{to_email}}`
- **Reply To:** `{{reply_to}}`
- **Subject:** `Thanks for contacting Naveen`

Suggested body:

```text
Hi {{from_name}},

Thanks for reaching out. Your message has been received and I will respond shortly.
```

Save both templates after changing these settings.

## GitHub Pages deployment

For the production static build, create GitHub Actions secrets with these exact names:

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO`

Push to `main` to rebuild and deploy. `NEXT_PUBLIC_*` values are compiled into the browser bundle; the EmailJS **public** key is designed for that use. Never add an EmailJS private key to the project, browser, or GitHub Actions environment.

## Contact-form behaviour

- The button immediately changes to **Sending…** and cannot be clicked twice.
- A successful owner notification is required for a successful submission.
- The visitor acknowledgement is sent immediately afterward.
- If the acknowledgement fails, the visitor sees that their message was delivered but the acknowledgement could not be sent.
- Provider failures are translated into a clear, persistent error state; typing in the form clears it for a retry.
