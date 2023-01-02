CREATE TABLE public.classes (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    subsystems_id integer,
    zachmans_id integer,
    notes text,
    dev text,
    lookup text,
    scrubber_flag boolean,
    increment_id_flag boolean,
    fk_constraints text,
    specialized_fields text
);

ALTER TABLE public.classes OWNER TO freerad2_special;

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_subsystems_id_fk FOREIGN KEY (subsystems_id) REFERENCES public.subsystems(id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_zachmans_id_fk FOREIGN KEY (zachmans_id) REFERENCES public.zachmans(id);
