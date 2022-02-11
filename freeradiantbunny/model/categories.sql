CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO freerad2_special;

CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.category_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    parent_id integer,
    img_url text
);


ALTER TABLE public.categories OWNER TO freerad2_special;

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_id_pkey PRIMARY KEY (id);
    
