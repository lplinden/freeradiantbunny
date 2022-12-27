CREATE SEQUENCE public.payments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.payments_id_seq OWNER TO freerad2_special;

CREATE TABLE public.payments (
    id integer DEFAULT nextval('public.payments_id_seq'::regclass) NOT NULL,
    invoice_id integer,
    date text,
    description text,
    amount text
);

ALTER TABLE public.payments OWNER TO freerad2_special;

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_invoice_id_fk FOREIGN KEY (invoice_id) REFERENCES public.invoices(id);
