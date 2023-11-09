-- version 0.0.5
CREATE TABLE public.subsystems (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    sort text NOT NULL,
    status text NOT NULL,
    img_url text NOT NULL,
    rules text NOT NULL
);

ALTER TABLE public.subsystems OWNER TO freerad2_special;

ALTER TABLE ONLY public.subsystems
    ADD CONSTRAINT subsystems_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.subsystems
    ADD CONSTRAINT subsystems_name_unique UNIQUE (name);
    
