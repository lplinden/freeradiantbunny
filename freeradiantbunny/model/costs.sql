CREATE SEQUENCE public.costs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.costs_id_seq OWNER TO freerad2_special;

CREATE TABLE public.costs (
    id integer DEFAULT nextval('public.costs_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    suppliers_id integer,
    class_name_string text,
    class_primary_key_string text
);

ALTER TABLE public.costs OWNER TO freerad2_special;

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT costs_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.costs
    ADD CONSTRAINT costs_suppliers_id_fk FOREIGN KEY (suppliers_id) REFERENCES public.suppliers(id);
