CREATE SEQUENCE public.calendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.calendar_id_seq OWNER TO freerad2_special;


CREATE TABLE public.calendars (
    id integer DEFAULT nextval('public.calendar_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE public.calendars OWNER TO freerad2_special;

ALTER TABLE ONLY public.calendars
    ADD CONSTRAINT calendars_id_pkey PRIMARY KEY (id);
    
