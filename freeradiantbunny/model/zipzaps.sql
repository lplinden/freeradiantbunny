CREATE SEQUENCE public.zipzap_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.zipzap_id_seq OWNER TO freerad2_special;

CREATE TABLE public.zipzaps (
    id integer DEFAULT nextval('public.zipzap_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    details text,
    igname text
);

ALTER TABLE public.zipzaps OWNER TO freerad2_special;

ALTER TABLE ONLY public.zipzaps
    ADD CONSTRAINT zipzap_id_pkey PRIMARY KEY (id);
