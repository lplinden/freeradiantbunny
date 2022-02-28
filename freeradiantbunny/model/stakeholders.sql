CREATE SEQUENCE public.stakeholder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.stakeholder_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stakeholders (
    id integer DEFAULT nextval('public.stakeholder_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text
);

ALTER TABLE public.stakeholders OWNER TO freerad2_special;
