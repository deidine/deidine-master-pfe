INSERT INTO 
"public"."form" 
("id", "title", "content", "description", "user_id", "created_at", "style", "elementStyle", "buttonStyle")
 VALUES ('2', 'vector mind', '[{"id":"3221","elementType":{"name":"dvsggoqpuf7","type":"text","label":"Label","style":"h-10 rounded-lg border ","value":"","pattern":"","required":false,"placeholder":"Placeholder"}},{"id":"7817","elementType":{"name":"9h3d6by4sfr","type":"datetime-local","label":"Label","style":"h-10 rounded-lg border ","value":"","pattern":"","required":false,"placeholder":"Placeholder"}},{"id":"733","elementType":{"name":"gd4hn18x2pg","type":"url","label":"Label","style":"h-10 rounded-lg border ","value":"","pattern":"","required":false,"placeholder":"Placeholder"}}]', null, '7d5ee29e-db0d-4bd0-a56f-896d7ad76240', '2024-08-20 11:22:15.165522+00', '{}', '{}', '{}');
create table
  public.form (
    id serial not null,
    title character varying(255) not null,
    content jsonb not null,
    description text null,
    user_id uuid null,
    created_at timestamp with time zone null default now(),
    style jsonb null,
    "elementStyle" jsonb null,
    "buttonStyle" jsonb null,
    "paragraphStyle" jsonb null,
    constraint form_pkey primary key (id),
    constraint form_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

  
create policy "Allow read for users based on user_id" 
on "public"."form"
as permissive
for select
using (
  auth.uid() = user_id
);

create policy "Allow insert for users based on user_id" 
on "public"."form"
as permissive
for insert
with check (
  auth.uid() = user_id
);

create policy "Allow update for users based on user_id" 
on "public"."form"
as permissive
for update
using (
  auth.uid() = user_id
);

create policy "Allow delete for users based on user_id" 
on "public"."form"
as permissive
for delete
using (
  auth.uid() = user_id
);


  alter table "public"."form"
enable row level security;
