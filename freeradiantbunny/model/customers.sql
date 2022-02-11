CREATE SEQUENCE public.customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO freerad2_special;

CREATE TABLE public.customers (
    id integer DEFAULT nextval('public.customer_id_seq'::regclass) NOT NULL,
    name text,
    project_id integer
);


ALTER TABLE public.customers OWNER TO freerad2_special;

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_id_pkey PRIMARY KEY (id);
    
