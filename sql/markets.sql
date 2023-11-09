CREATE SEQUENCE public.markets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.markets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.markets (
    id integer DEFAULT nextval('public.markets_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    url text,
    api text
);

ALTER TABLE public.markets OWNER TO freerad2_special;

ALTER TABLE ONLY public.markets
    ADD CONSTRAINT markets_pk PRIMARY KEY (id);
