CREATE SEQUENCE public.kernel_theory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.kernel_theory_id_seq OWNER TO freerad2_special;

CREATE TABLE public.kernel_theories (
    id integer DEFAULT nextval('public.kernel_theory_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    status text,
    img_url text,
    description text
);

ALTER TABLE public.kernel_theories OWNER TO freerad2_special;
