CREATE SEQUENCE public.plant_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.plant_list_id_seq OWNER TO freerad2_special;

--
-- Name: plant_lists; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.plant_lists (
    id integer DEFAULT nextval('public.plant_list_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    description text,
    status text,
    img_url text
);


ALTER TABLE public.plant_lists OWNER TO freerad2_special;
