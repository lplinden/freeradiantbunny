CREATE TABLE public.zachmans (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.zachmans OWNER TO freerad2_special;

ALTER TABLE ONLY public.zachmans
    ADD CONSTRAINT zachmans_pk PRIMARY KEY (id);
