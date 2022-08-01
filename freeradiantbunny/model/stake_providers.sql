CREATE SEQUENCE public.stake_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.stake_provider_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stake_providers (
    id integer DEFAULT nextval('public.stake_provider_id_seq'::regclass) NOT NULL,
    name text,
    stake_id integer;
    provider_id integer,
);

ALTER TABLE public.stake_providers OWNER TO freerad2_special;
