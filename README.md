## STEMulate Research Program  

### What is this code used for?

This repository contains code for website in React.js, which is made for STEMulate Research program for bringing in new students and accepting applications and also internal mail processing in Python. 

### Tech stack

- React.js, Typescript, Vite.
- Supabase for application data storage with RLS configured.

### What is STEMulate Research Program?

International research program, uniting students from over 20 countries, mentored by experts from top institutions like Stanford, Purdue, UC Berkley, in collaboration with OdepLabs and 360mentors, aimed at achieving the 4th Sustainable Development Goal of the United Nations: ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.

You can contact us using:
- Instagram: <a href="https://instagram.com/stemulate_program">@stemulate_program</a>
- Linkedin: <a href="https://www.linkedin.com/company/stemulate-program/">STEMulate Program</a>
- Email: <a href="mailto:admissions@stemulateprogram.com">admissions@stemulateprogram.com</a>

## Database

Supabase serves as our primary data persistence layer; consequently, all data operations are executed using PostgreSQL functionalities, complemented by Supabase-specific enhancements.

### Schema

```sql
CREATE TABLE public.applications (
  createdAt timestamp with time zone NOT NULL DEFAULT now(),
  city text,
  country text,
  phone text,
  ieltsScore text,
  satScore text,
  schoolName text,
  grade text,
  gpa text,
  parentPhone text,
  firstName text,
  fieldsOfInterest ARRAY,
  researchInterest text,
  motivation text,
  additionalInfo text,
  financialAid text,
  extracurriculars text,
  createdBy uuid NOT NULL DEFAULT auth.uid() UNIQUE,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  lastName text,
  noFinancialAidMoney text,
  parentFirstName text,
  parentLastName text,
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

