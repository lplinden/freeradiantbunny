CREATE SEQUENCE public.design_orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.design_orders_id_seq OWNER TO freerad2_special;

CREATE TABLE public.design_orders (
    id integer DEFAULT nextval('public.design_orders_id_seq'::regclass) NOT NULL,
    date text,
    note text,
    supplier_id integer
);

ALTER TABLE public.design_orders OWNER TO freerad2_special;

ALTER TABLE ONLY public.design_orders
    ADD CONSTRAINT design_orders_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.design_orders
    ADD CONSTRAINT design_orders_supplier_id_fk FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);
