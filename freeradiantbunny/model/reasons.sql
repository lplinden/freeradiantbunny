CREATE SEQUENCE public.reasons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.reasons_id_seq OWNER TO freerad2_special;

CREATE TABLE public.reasons (
    id integer DEFAULT nextval('public.reasons_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    orderby integer
);

ALTER TABLE public.reasons OWNER TO freerad2_special;

ALTER TABLE ONLY public.reasons
    ADD CONSTRAINT reasons_pk PRIMARY KEY (id);
