CREATE SEQUENCE public.invoice_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.invoice_id_seq OWNER TO freerad2_special;

CREATE TABLE public.invoices (
    id integer DEFAULT nextval('public.invoice_id_seq'::regclass) NOT NULL,
    customer_id integer,
    date text
);

ALTER TABLE public.invoices OWNER TO freerad2_special;
