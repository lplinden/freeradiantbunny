-- version 0.0.5
CREATE TABLE public.classes (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    sort text NOT NULL,
    status text NOT NULL,
    img_url text NOT NULL,
    dev text NOT NULL,
    lookup text NOT NULL,
    fk_constraints text NOT NULL,
    specialized_fields text NOT NULL,
    privileged_owner text NOT NULL,
    make_unique text NOT NULL,
    increment_id_flag boolean NOT NULL,
    scrubber_flag boolean NOT NULL,
    subsystems_id integer NOT NULL,
    zachmans_id integer NOT NULL,
    make_index_flag boolean NOT NULL,
    private_flag boolean NOT NULL	
);

ALTER TABLE public.classes OWNER TO freerad2_special;

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_name_unique UNIQUE (name);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_subsystems_id_fk FOREIGN KEY (subsystems_id) REFERENCES public.subsystems(id);

ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_zachmans_id_fk FOREIGN KEY (zachmans_id) REFERENCES public.zachmans(id);
