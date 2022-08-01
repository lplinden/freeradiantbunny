CREATE SEQUENCE public.address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.address_id_seq OWNER TO freerad2_special;

CREATE TABLE public.addresses (
    id integer DEFAULT nextval('public.address_id_seq'::regclass) NOT NULL,
    name text,
    address text,
    coin_id integer
);

ALTER TABLE public.addresses OWNER TO freerad2_special;

ALTER TABLE ONLY public.addresss
    ADD CONSTRAINT address_id_pkey PRIMARY KEY (id);
