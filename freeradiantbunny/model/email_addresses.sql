CREATE SEQUENCE public.email_addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.email_addresses_id_seq OWNER TO freerad2_special;

CREATE TABLE public.email_addresses (
    id integer DEFAULT nextval('public.email_addresses_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text
);

ALTER TABLE public.email_addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.email_addresses
    ADD CONSTRAINT email_addresses_pk PRIMARY KEY (id);
