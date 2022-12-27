CREATE SEQUENCE public.stakes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.stakes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stakes (
    id integer DEFAULT nextval('public.stakes_id_seq'::regclass) NOT NULL,
    name text,
    address text
);

ALTER TABLE public.stakes OWNER TO freerad2_special;

ALTER TABLE ONLY public.stakes
    ADD CONSTRAINT stakes_pk PRIMARY KEY (id);
