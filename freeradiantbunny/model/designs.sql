--
-- Name: design_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.design_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.design_id_seq OWNER TO freerad2_special;

CREATE TABLE public.designs (
    id integer DEFAULT nextval('public.design_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    domain_tli character varying(3),
    img_url text,
    publish text
);


ALTER TABLE public.designs OWNER TO freerad2_special;
