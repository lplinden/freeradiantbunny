CREATE SEQUENCE public.plant_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.plant_category_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plant_categories (
    id integer DEFAULT nextval('public.plant_category_id_seq'::regclass) NOT NULL,
    name text,
    description text
);


ALTER TABLE public.plant_categories OWNER TO freerad2_special;
