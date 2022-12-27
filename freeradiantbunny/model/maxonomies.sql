CREATE SEQUENCE public.maxonomies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.maxonomies_id_seq OWNER TO freerad2_special;

CREATE TABLE public.maxonomies (
    id integer DEFAULT nextval('public.maxonomies_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    categorization text,
    how_to_measure text,
    ocm integer,
    order_by text
);

ALTER TABLE public.maxonomies OWNER TO freerad2_special;

ALTER TABLE ONLY public.maxonomies
    ADD CONSTRAINT maxonomies_pk PRIMARY KEY (id);
