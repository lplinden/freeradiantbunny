CREATE SEQUENCE public.hyperlink_plants_id_seq
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 2;

ALTER TABLE public.hyperlink_plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hyperlink_plants (
    id integer DEFAULT nextval('public.hyperlink_plants_id_seq'::regclass) NOT NULL,
    hyperlink_id integer NOT NULL,
    plant_id integer NOT NULL
);

ALTER TABLE public.hyperlink_plants OWNER TO freerad2_special;
