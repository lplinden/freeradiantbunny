CREATE TABLE public.modules (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    dev text,
);

ALTER TABLE public.modules OWNER TO freerad2_special;

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pk PRIMARY KEY (id);

