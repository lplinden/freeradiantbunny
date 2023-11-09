CREATE SEQUENCE public.prospects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.prospects_id_seq OWNER TO freerad2_special;

CREATE TABLE public.prospects (
    id integer DEFAULT nextval('public.prospects_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    industries text,
    use_cases text,
    needs text,
    contacts text
);

ALTER TABLE public.prospects OWNER TO freerad2_special;

ALTER TABLE ONLY public.prospects
    ADD CONSTRAINT prospects_pk PRIMARY KEY (id);
