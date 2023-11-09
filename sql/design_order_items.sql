CREATE SEQUENCE public.design_order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.design_order_items_id_seq OWNER TO freerad2_special;

CREATE TABLE public.design_order_items (
    id integer DEFAULT nextval('public.design_order_items_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    img_url text,
    status text,
    sort text,
    design_order_id integer,
    cost text,
    shipping_cost text,
    design_instance_id integer
);

ALTER TABLE public.design_order_items OWNER TO freerad2_special;

ALTER TABLE ONLY public.design_order_items
    ADD CONSTRAINT design_order_items_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.design_order_items
    ADD CONSTRAINT design_order_items_design_order_id_fk FOREIGN KEY (design_order_id) REFERENCES public.design_order(id);

ALTER TABLE ONLY public.design_order_items
    ADD CONSTRAINT design_order_items_design_instance_id_fk FOREIGN KEY (design_instance_id) REFERENCES public.design_instances(id);
