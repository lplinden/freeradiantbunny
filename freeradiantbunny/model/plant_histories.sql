CREATE SEQUENCE public.plant_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.plant_history_id_seq OWNER TO freerad2_special;


CREATE TABLE public.plant_histories (
    id integer DEFAULT nextval('public.plant_history_id_seq'::regclass) NOT NULL,
    plant_list_plant_id integer,
    seed_packet_id integer
);


ALTER TABLE public.plant_histories OWNER TO freerad2_special;
