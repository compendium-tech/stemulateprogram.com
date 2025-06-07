create policy "Enable users to view their own data only"
on "public"."applications"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = "createdBy")
);
