CREATE TABLE public.classes (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    zachman_id integer,
    subsystem_id integer,
    notes text,
    dev text,
    lookup text,
    scrubber_flag text,
    fk_constraints text,
    specialized_fields text,
    codebase text
);

ALTER TABLE public.classes OWNER TO freerad2_special;

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_zachman_id_fk FOREIGN KEY (zachman_id) REFERENCES public.zachmans(id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_subsystem_id_fk FOREIGN KEY (subsystem_id) REFERENCES public.subsytems(id);
