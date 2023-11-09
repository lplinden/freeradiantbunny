-- version 0.0.5
CREATE TABLE public.zachmans (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    sort text NOT NULL,
    status text NOT NULL,
    img_url text NOT NULL
);

ALTER TABLE public.zachmans OWNER TO freerad2_special;

ALTER TABLE ONLY public.zachmans
    ADD CONSTRAINT zachmans_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.zachmans
    ADD CONSTRAINT zachmans_name_unique UNIQUE (name);
