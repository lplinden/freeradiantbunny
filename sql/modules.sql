-- version 0.0.5
CREATE TABLE public.modules (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    img_url text NOT NULL,
    status text NOT NULL,
    sort text NOT NULL,
    dev text NOT NULL
);

ALTER TABLE public.modules OWNER TO freerad2_special;

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_name_unique UNIQUE (name);
    
