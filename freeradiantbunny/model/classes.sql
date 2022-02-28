CREATE TABLE public.classes (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    notes text,
    zachman_id integer,
    sort text,
    status text,
    img_url text,
    subsystem text,
    dev text,
    codebase text,
    lookup text
);

ALTER TABLE public.classes OWNER TO freerad2_special;

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT class_id_pkey PRIMARY KEY (id);
    
