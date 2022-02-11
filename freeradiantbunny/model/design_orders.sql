CREATE SEQUENCE public.design_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.design_order_id_seq OWNER TO freerad2_special;

CREATE SEQUENCE public.design_order_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.design_order_item_id_seq OWNER TO freerad2_special;

CREATE TABLE public.design_order_items (
    id integer DEFAULT nextval('public.design_order_item_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    design_order_id integer,
    cost text,
    shipping_cost text,
    design_instance_id integer
);


ALTER TABLE public.design_order_items OWNER TO freerad2_special;

CREATE TABLE public.design_orders (
    id integer DEFAULT nextval('public.design_order_id_seq'::regclass) NOT NULL,
    date text,
    note text,
    supplier_id integer
);


ALTER TABLE public.design_orders OWNER TO freerad2_special;
