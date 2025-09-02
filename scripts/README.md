# Demo Accounts Setup

This directory contains scripts to set up demo accounts in your Supabase project.

## Prerequisites

1. Node.js installed on your system
2. A `.env.local` file in the frontend directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Setting Up Demo Accounts

1. Install dependencies (if not already installed):
   ```bash
   cd frontend
   npm install
   ```

2. Run the setup script:
   ```bash
   cd ..
   node scripts/setup-demo-accounts.js
   ```

## Demo Accounts

The script will create the following demo accounts:

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: System Administrator

### Teacher Account
- **Email**: teacher@example.com
- **Password**: teacher123
- **Role**: Academic Staff

## Troubleshooting

- If you get authentication errors, verify your Supabase credentials in `.env.local`
- Ensure your Supabase project has email/password authentication enabled
- Check the Supabase dashboard for any error logs

## Security Note

- These are demo credentials - change them before deploying to production
- Consider using environment variables for production credentials
- Regularly rotate passwords in a production environment
