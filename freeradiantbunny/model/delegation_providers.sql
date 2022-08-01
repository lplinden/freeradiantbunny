CREATE SEQUENCE public.delegation_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.delegation_provider_id_seq OWNER TO freerad2_special;

CREATE TABLE public.delegation_providers (
    id integer DEFAULT nextval('public.delegation_provider_id_seq'::regclass) NOT NULL,
    delegation_id integer,
    provider_id integer,
    bips text,
    call_date text,
    tx_hash text,
    tx_fee text
);

ALTER TABLE public.delegation_providers OWNER TO freerad2_special;
