CREATE SEQUENCE public.rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.rule_id_seq OWNER TO freerad2_special;

CREATE TABLE public.rules (
    id integer DEFAULT nextval('public.rule_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    img_url text,
    sort text,
    status text,
    antecedent text,
    consequent text
);

ALTER TABLE public.rules OWNER TO freerad2_special;
