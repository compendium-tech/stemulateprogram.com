<img src="https://github.com/user-attachments/assets/6fcb38bd-e87f-4cbe-bc68-8fa1fcb18fff" width="45%" /> 
<img src="https://github.com/user-attachments/assets/7c6a1d4f-8790-4625-a6c0-dec6924e970d" width="40%"/>
<img src="https://github.com/user-attachments/assets/d05e1f8a-c393-43a1-aadb-417f26436a8a" width="40%" />
<img src="https://github.com/user-attachments/assets/c65f4421-9ce8-40d8-9a85-4e62ccae2e55" width="35%" />

### What is STEMulate Research Program?

International research program, uniting students from over 20 countries, mentored by experts from top institutions like Stanford, Purdue, UC Berkley, in collaboration with OdepLabs and 360mentors, aimed at achieving the 4th Sustainable Development Goal of the United Nations: ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.

You can contact us using:
- Instagram: <a href="https://instagram.com/stemulate_program">@stemulate_program</a>
- Linkedin: <a href="https://www.linkedin.com/company/stemulate-program/">STEMulate Program</a>
- Email: <a href="mailto:admissions@stemulateprogram.com">admissions@stemulateprogram.com</a>

# Tables of contents

- <a href="#tech-stack">Tech stack</a>
- <a href="#database">Database</a>
- <a href="#how-to-run">How to run (locally)</a>

<hr />

## Tech stack

- React.js, Typescript, Vite.
- Supabase for application data storage with RLS configured.
- Google Sheets API v4 for transfering application data from Supabase to Google Sheets.
- Python, SMTP for sending automated emails through MailTrap.

## Database

Supabase serves as our primary data persistence layer; consequently, all data operations are executed using PostgreSQL functionalities, complemented by Supabase-specific enhancements.

### Schema

```sql
CREATE TABLE public.applications (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  firstName text, lastName text, phone text,
  city text, country text, schoolName text, grade text, gpa text,
  ieltsScore text, satScore text,
  fieldsOfInterest ARRAY, researchInterest text, motivation text, additionalInfo text,
  financialAid text, noFinancialAidMoney text,
  extracurriculars text,
  parentFirstName text, parentLastName text, parentPhone text,
  createdBy uuid NOT NULL DEFAULT auth.uid() UNIQUE,
  createdAt timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT applications_pkey PRIMARY KEY (id, createdBy)
);
```

### Row Level Security (RLS) Policies

The following RLS policies are applied to the `applications` table to control data access:

- Enable users to view their own data only:
  ```sql
  alter policy "Enable users to view their own data only"
  on "public"."applications"
  to authenticated
  using (
    (( SELECT auth.uid() AS uid) = "createdBy")
  );
  ```
  This policy ensures that authenticated users can only view application records that they created themselves.

- Ensure `createdBy` is equal to `auth.uid()`:
  ```sql
  alter policy "Ensure createdBy is auth.uid()"
  on "public"."applications"
  to authenticated
  with check (
    ("createdBy" = auth.uid())
  );
  ```
  This policy enforces that the createdBy column is always set to the authenticated user's ID when a new application record is created.

## How to run

```
git clone https://github.com/seacite-tech/stemulate
cd stemulate
npm install
npm run dev
```
