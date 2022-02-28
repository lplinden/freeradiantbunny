CREATE SEQUENCE public.timecard_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.timecard_id_seq OWNER TO freerad2_special;

CREATE TABLE public.timecards (
    id integer DEFAULT nextval('public.timecard_id_seq'::regclass) NOT NULL,
    doer_user_name text,
    date_in text,
    time_in text,
    time_out text,
    description text,
    class_primary_key_string text,
    date_out text,
    database_string text,
    class_name_string text
);

ALTER TABLE public.timecards OWNER TO freerad2_special;
