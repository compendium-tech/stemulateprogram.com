<img width="48%" src="https://github.com/user-attachments/assets/ddacd1f8-1ef7-4b25-afb9-f2ca11212f92" />
<img src="https://github.com/user-attachments/assets/7c6a1d4f-8790-4625-a6c0-dec6924e970d" width="48%"/>
<img src="https://github.com/user-attachments/assets/c65f4421-9ce8-40d8-9a85-4e62ccae2e55" width="39%" />
<img src="https://github.com/user-attachments/assets/d05e1f8a-c393-43a1-aadb-417f26436a8a" width="59%" />

### What is STEMulate Research Program?

International research program, uniting students from over 20 countries, mentored by experts from top institutions like Stanford, Purdue, UC Berkley, in collaboration with OdepLabs and 360mentors, aimed at achieving the 4th Sustainable Development Goal of the United Nations: ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.

You can contact us using:
- Instagram: <a href="https://instagram.com/stemulate_program">@stemulate_program</a>.
- Linkedin: <a href="https://www.linkedin.com/company/stemulate-program/">STEMulate Program</a>.
- Email: <a href="mailto:admissions@stemulateprogram.com">admissions@stemulateprogram.com</a>.

# Tables of contents

- <a href="#tech-stack">Tech stack</a>
- <a href="#how-to-run">How to run (locally)</a>
- <a href="#database">Setting up database</a>

<hr />

## Tech stack

- React.js, Typescript, Vite.
- HCaptcha, Supabase with RLS configured.
- Google Sheets API v4 for transfering application data from Supabase to Google Sheets.
- Python, SMTP for sending automated emails through MailTrap.

## How to run

```bash
git clone https://github.com/seacite-tech/stemulate
cd stemulate
npm install
npm run dev
```

## Database

Supabase serves as our primary data persistence layer; consequently, all data operations are executed using PostgreSQL functionalities, complemented by Supabase-specific enhancements. All data required to replicate our Supabase setup is located in `supabase` folder.

### Transferring Applications Table to Google Sheets

To automatically transfer your application data to Google Sheets, follow these steps:

* **Create a Service Account:** Before proceeding, ensure you have created a Google Service Account. This account will be used to programmatically access your Google Sheet.

* **Invite Service Account as Editor:** Share your Google Sheet with the email address of the newly created service account and grant it **Editor** permissions. This allows the service account to write data to your sheet.

* **Download Credentials:** Obtain the service account's JSON key file (e.g., `service_account.json`). Store this file securely.

* Navigate to your `automation` directory:
  ```bash
  cd automation
  ```

* Create a `.env` file within the automation directory and populate it with your specific credentials and sheet details.
  ```env
  SUPABASE_URL=https://abrakadabra.supabase.co
  SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  GOOGLE_SHEETS_CREDENTIALS_PATH=service_account.json
  GOOGLE_SHEET_NAME=STEMulate 2025
  GOOGLE_SHEET_WORKSHEET_NAME=Application
  ```

  - `SUPABASE_URL`: Your Supabase project URL.
  - `SUPABASE_ANON_KEY`: Your Supabase anonymous key.
  - `GOOGLE_SHEETS_CREDENTIALS_PATH`: The path to your service account's JSON key file (e.g., service_account.json).
  - `GOOGLE_SHEET_NAME`: The exact name of your Google Sheet.
  - `GOOGLE_SHEET_WORKSHEET_NAME`: The exact name of the specific worksheet (tab) within your Google Sheet where data should be inserted.

* Create Python virtual environment and install all necessary dependencies:
  ```
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  ```

* Execute the Python script to transfer data manually to test if everything works correctly:
  ```
  python3 google_sheets.py
  ```

* To automate the data transfer at regular intervals, you can set up a cron job. This example schedules the script to run every day at 3:00 AM.
  ```bash
  0 3 * * * /usr/bin/python3 /path/to/your/automation/google_sheets.py >> /path/to/your/automation/cron.log 2>&1
  ```

> [!NOTE]
> Remember to replace the placeholder paths with your actual paths before setting up the cron job.


