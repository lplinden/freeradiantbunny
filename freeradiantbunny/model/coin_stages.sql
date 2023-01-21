CREATE SEQUENCE public.coin_stages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.coin_stages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.coin_stages (
    id integer DEFAULT nextval('public.coin_stages_id_seq'::regclass) NOT NULL,
    name text,
    pos integer
);

ALTER TABLE public.coin_stages OWNER TO freerad2_special;

ALTER TABLE ONLY public.coin_stages
    ADD CONSTRAINT coin_stages_pk PRIMARY KEY (id);
