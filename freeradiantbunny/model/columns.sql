CREATE SEQUENCE public.columns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.columns_id_seq OWNER TO freerad2_special;

CREATE TABLE public.columns (
    id integer DEFAULT nextval('public.columns_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.columns OWNER TO freerad2_special;

ALTER TABLE ONLY public.columns
    ADD CONSTRAINT columns_pk PRIMARY KEY (id);
