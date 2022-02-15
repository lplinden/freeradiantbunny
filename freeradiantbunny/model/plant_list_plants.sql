CREATE SEQUENCE public.plant_list_plant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.plant_list_plant_id_seq OWNER TO freerad2_special;


CREATE TABLE public.plant_list_plants (
    id integer DEFAULT nextval('public.plant_list_plant_id_seq'::regclass) NOT NULL,
    plant_list_id integer,
    plant_id integer
);


ALTER TABLE public.plant_list_plants OWNER TO freerad2_special;
