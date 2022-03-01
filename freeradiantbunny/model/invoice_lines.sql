CREATE SEQUENCE public.invoice_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.invoice_line_id_seq OWNER TO freerad2_special;

CREATE TABLE public.invoice_lines (
    id integer DEFAULT nextval('public.invoice_line_id_seq'::regclass) NOT NULL,
    invoice_id integer,
    product_id integer,
    quantity text,
    price text,
    note text
);

ALTER TABLE public.invoice_lines OWNER TO freerad2_special;
