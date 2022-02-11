CREATE SEQUENCE public.supplier_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.supplier_id_sequence OWNER TO freerad2_special;

CREATE TABLE public.suppliers (
    id integer DEFAULT nextval('public.supplier_id_sequence'::regclass) NOT NULL,
    name text,
    city text,
    state text,
    url text,
    bioregion text,
    sort text,
    status text,
    description text,
    user_name text,
    img_url text,
    last_password_change text
);


ALTER TABLE public.suppliers OWNER TO freerad2_special;

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT supplier_id_pkey PRIMARY KEY (id);
    
