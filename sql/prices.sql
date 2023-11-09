CREATE SEQUENCE public.prices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.prices_id_seq OWNER TO freerad2_special;

CREATE TABLE public.prices (
    id integer DEFAULT nextval('public.prices_id_seq'::regclass) NOT NULL,
    plant_id integer,
    supplier_id integer,
    unit_id integer,
    date character varying(10),
    dollars character varying(10),
    unit_count text,
    quality text,
    organic_flag character varying(10)
);

ALTER TABLE public.prices OWNER TO freerad2_special;

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_supplier_id_fk FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_unit_id_fk FOREIGN KEY (unit_id) REFERENCES public.units(id);
