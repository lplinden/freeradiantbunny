CREATE SEQUENCE public.asset_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.asset_type_id_seq OWNER TO freerad2_special;

CREATE TABLE public.asset_types (
    id integer DEFAULT nextval('public.asset_type_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE public.asset_types OWNER TO freerad2_special;
