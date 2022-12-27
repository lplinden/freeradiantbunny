CREATE SEQUENCE public.potentials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.potentials_id_seq OWNER TO freerad2_special;

CREATE TABLE public.potentials (
    id integer DEFAULT nextval('public.potentials_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    address text,
    homepage text,
    notes text,
    webmaster_info text
);

ALTER TABLE public.potentials OWNER TO freerad2_special;

ALTER TABLE ONLY public.potentials
    ADD CONSTRAINT potentials_pk PRIMARY KEY (id);
