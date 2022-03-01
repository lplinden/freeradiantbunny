CREATE SEQUENCE public.pickup_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.pickup_detail_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickup_details (
    id integer DEFAULT nextval('public.pickup_detail_id_seq'::regclass) NOT NULL,
    date text,
    land_id integer
);

ALTER TABLE public.pickup_details OWNER TO freerad2_special;
