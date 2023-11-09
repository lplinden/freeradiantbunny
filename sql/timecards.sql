CREATE SEQUENCE public.timecards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.timecards_id_seq OWNER TO freerad2_special;

CREATE TABLE public.timecards (
    id integer DEFAULT nextval('public.timecards_id_seq'::regclass) NOT NULL,
    description text,
    date_in text,
    time_in text,
    date_out text,
    time_out text
);

ALTER TABLE public.timecards OWNER TO freerad2_special;

ALTER TABLE ONLY public.timecards
    ADD CONSTRAINT timecards_pk PRIMARY KEY (id);
