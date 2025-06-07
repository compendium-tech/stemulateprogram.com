alter policy "Ensure createdBy is auth.uid()"
on "public"."applications"
to authenticated
with check (
  ("createdBy" = auth.uid())
);
