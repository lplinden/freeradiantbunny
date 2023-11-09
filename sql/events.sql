CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.events_id_seq OWNER TO freerad2_special;

CREATE TABLE public.events (
    id integer DEFAULT nextval('public.events_id_seq'::regclass) NOT NULL,
    name text,
    time_start timestamp with time zone,
    time_finish timestamp with time zone
);

ALTER TABLE public.events OWNER TO freerad2_special;

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pk PRIMARY KEY (id);
