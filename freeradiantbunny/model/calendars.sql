CREATE SEQUENCE public.calendars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.calendars_id_seq OWNER TO freerad2_special;

CREATE TABLE public.calendars (
    id integer DEFAULT nextval('public.calendars_id_seq'::regclass) NOT NULL,
    name text
);

ALTER TABLE public.calendars OWNER TO freerad2_special;

ALTER TABLE ONLY public.calendars
    ADD CONSTRAINT calendars_pk PRIMARY KEY (id);
