--
-- Name: design_instance_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.design_instance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.design_instance_id_seq OWNER TO freerad2_special;

--
-- Name: design_instances; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.design_instances (
    id integer DEFAULT nextval('public.design_instance_id_seq'::regclass) NOT NULL,
    design_id integer,
    name text,
    status text,
    unit_id integer,
    description text,
    sort text,
    img_url text
);


ALTER TABLE public.design_instances OWNER TO freerad2_special;
