CREATE SEQUENCE public.invoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.invoices_id_seq OWNER TO freerad2_special;

CREATE TABLE public.invoices (
    id integer DEFAULT nextval('public.invoices_id_seq'::regclass) NOT NULL,
    customer_id integer,
    date text
);

ALTER TABLE public.invoices OWNER TO freerad2_special;

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_customer_id_fk FOREIGN KEY (customer_id) REFERENCES public.customers(id);
