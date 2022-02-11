CREATE SEQUENCE public.hyperlink_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.hyperlink_category_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_categories (
    hyperlink_id integer NOT NULL,
    category_id integer NOT NULL,
    id integer DEFAULT nextval('public.hyperlink_category_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.hyperlink_categories OWNER TO freerad2_special;

ALTER TABLE ONLY public.hyperlink_categories
    ADD CONSTRAINT hyperlink_category_id_pkey PRIMARY KEY (id);

