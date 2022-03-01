CREATE SEQUENCE public.pickup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.pickup_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickups (
    id integer DEFAULT nextval('public.pickup_id_seq'::regclass) NOT NULL,
    pickup_detail_id integer,
    invoice_line_id integer,
    delivery_stop_flag text
);

ALTER TABLE public.pickups OWNER TO freerad2_special;
