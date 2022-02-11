CREATE SEQUENCE public.harvest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.harvest_id_seq OWNER TO freerad2_special;

CREATE TABLE public.harvests (
    id integer DEFAULT nextval('public.harvest_id_seq'::regclass) NOT NULL,
    project_id integer,
    name text,
    sort integer,
    shares_estimate integer
);


ALTER TABLE public.harvests OWNER TO freerad2_special;

ALTER TABLE ONLY public.harvests
    ADD CONSTRAINT harvest_id_pkey PRIMARY KEY (id);
    
