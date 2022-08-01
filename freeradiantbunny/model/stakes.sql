CREATE SEQUENCE public.stake_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.stake_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stakes (
    id integer DEFAULT nextval('public.stake_id_seq'::regclass) NOT NULL,
    name text,
    address text
);

ALTER TABLE public.stakes OWNER TO freerad2_special;
