CREATE SEQUENCE public.suppliers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.suppliers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.suppliers (
    id integer DEFAULT nextval('public.suppliers_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    city text,
    state text,
    url text,
    bioregion text,
    last_password_change text,
    username text
);

ALTER TABLE public.suppliers OWNER TO freerad2_special;

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pk PRIMARY KEY (id);
