CREATE SEQUENCE public.design_instances_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.design_instances_id_seq OWNER TO freerad2_special;

CREATE TABLE public.design_instances (
    id integer DEFAULT nextval('public.design_instances_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text
    status text,
    sort text,
    unit_id integer,
    design_id integer,
);

ALTER TABLE public.design_instances OWNER TO freerad2_special;

ALTER TABLE ONLY public.design_instances
    ADD CONSTRAINT design_instances_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.design_instances
    ADD CONSTRAINT design_instances_design_id_fk FOREIGN KEY (design_id) REFERENCES public.designs(id);

ALTER TABLE ONLY public.design_instances
    ADD CONSTRAINT design_instances_unit_id_fk FOREIGN KEY (unit_id) REFERENCES public.units(id);
