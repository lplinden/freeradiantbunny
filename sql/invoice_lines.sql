CREATE SEQUENCE public.invoice_lines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.invoice_lines_id_seq OWNER TO freerad2_special;

CREATE TABLE public.invoice_lines (
    id integer DEFAULT nextval('public.invoice_lines_id_seq'::regclass) NOT NULL,
    invoice_id integer,
    product_id integer,
    quantity text,
    price text,
    note text
);

ALTER TABLE public.invoice_lines OWNER TO freerad2_special;

ALTER TABLE ONLY public.invoice_lines
    ADD CONSTRAINT invoice_lines_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.invoice_lines
    ADD CONSTRAINT invoice_lines_invoiceid_fk FOREIGN KEY (invoiceid) REFERENCES public.FK_TABLE_NAME_NOT_FOUND(id);

ALTER TABLE ONLY public.invoice_lines
    ADD CONSTRAINT invoice_lines_product_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);
