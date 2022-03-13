CREATE SEQUENCE public.timecard_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.timecard_id_seq OWNER TO freerad2_special;

CREATE TABLE public.timecards (
    id integer DEFAULT nextval('public.timecard_id_seq'::regclass) NOT NULL,
    description text,
    date_in text,
    time_in text,
    date_out text,
    time_out text
);

ALTER TABLE public.timecards OWNER TO freerad2_special;

ALTER TABLE ONLY public.timecards
    ADD CONSTRAINT timecard_id_pkey PRIMARY KEY (id);
    
