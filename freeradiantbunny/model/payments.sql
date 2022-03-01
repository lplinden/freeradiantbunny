CREATE SEQUENCE public.payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.payment_id_seq OWNER TO freerad2_special;

CREATE TABLE public.payments (
    id integer DEFAULT nextval('public.payment_id_seq'::regclass) NOT NULL,
    date text,
    invoice_id integer,
    description text,
    amount text
);

ALTER TABLE public.payments OWNER TO freerad2_special;
