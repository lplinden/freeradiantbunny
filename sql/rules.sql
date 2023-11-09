CREATE SEQUENCE public.rules_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.rules_id_seq OWNER TO freerad2_special;

CREATE TABLE public.rules (
    id integer DEFAULT nextval('public.rules_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    antecedent text,
    consequent text
);

ALTER TABLE public.rules OWNER TO freerad2_special;

ALTER TABLE ONLY public.rules
    ADD CONSTRAINT rules_pk PRIMARY KEY (id);
