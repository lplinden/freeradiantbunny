CREATE SEQUENCE public.shift_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.shift_id_seq OWNER TO freerad2_special;

CREATE TABLE public.shifts (
    id integer DEFAULT nextval('public.shift_id_seq'::regclass) NOT NULL,
    sort text,
    start text,
    timeout text,
    day_of_week integer
);

ALTER TABLE public.shifts OWNER TO freerad2_special;
