CREATE SEQUENCE public.agricultural_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.agricultural_type_id_seq OWNER TO freerad2_special;

CREATE TABLE public.agricultural_types (
    id integer DEFAULT nextval('public.agricultural_type_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    img_url text,
    status text,
    sort text
);


ALTER TABLE public.agricultural_types OWNER TO freerad2_special;

ALTER TABLE ONLY public.agricultural_types
    ADD CONSTRAINT agricultural_type_id_pkey PRIMARY KEY (id);
