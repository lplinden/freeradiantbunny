CREATE SEQUENCE public.stage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.stage_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stages (
    id integer DEFAULT nextval('public.stage_id_seq'::regclass) NOT NULL,
    name text,
    pos integer
);

ALTER TABLE public.stages OWNER TO freerad2_special;

ALTER TABLE ONLY public.stages
    ADD CONSTRAINT stage_id_pkey PRIMARY KEY (id);
