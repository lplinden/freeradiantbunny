CREATE TABLE public.beds (
    id integer NOT NULL,
    name text NOT NULL,
    land_id integer NOT NULL,
    sort text,
    img_url text,
    description text,
    status text
);


ALTER TABLE public.beds OWNER TO freerad2_special;

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT bed_id_pkey PRIMARY KEY (id);
 
