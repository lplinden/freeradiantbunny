CREATE SEQUENCE public.kernel_theories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.kernel_theories_id_seq OWNER TO freerad2_special;

CREATE TABLE public.kernel_theories (
    id integer DEFAULT nextval('public.kernel_theories_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.kernel_theories OWNER TO freerad2_special;

ALTER TABLE ONLY public.kernel_theories
    ADD CONSTRAINT kernel_theories_pk PRIMARY KEY (id);
