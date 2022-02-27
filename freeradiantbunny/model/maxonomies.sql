
CREATE SEQUENCE public.maxonomy_id_seq
    START WITH 192
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.maxonomy_id_seq OWNER TO freerad2_special;

CREATE TABLE public.maxonomies (
    id integer DEFAULT nextval('public.maxonomy_id_seq'::regclass) NOT NULL,
    name text,
    img_url text,
    status text,
    sort text,
    description text,
    categorization text,
    how_to_measure text,
    ocm integer,
    order_by text
);


ALTER TABLE public.maxonomies OWNER TO freerad2_special;
