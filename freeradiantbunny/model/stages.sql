CREATE SEQUENCE public.stages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.stages_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stages (
    id integer DEFAULT nextval('public.stages_id_seq'::regclass) NOT NULL,
    name text,
    pos integer
);

ALTER TABLE public.stages OWNER TO freerad2_special;

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stages_pk PRIMARY KEY (id);
