--
-- Name: application_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.application_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.application_id_seq OWNER TO freerad2_special;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.applications (
    id integer DEFAULT nextval('public.application_id_seq'::regclass) NOT NULL,
    name text,
    url text,
    source_code_url text,
    development text,
    sort text DEFAULT 'Y'::text,
    img_url text,
    description text,
    status text,
    publish text
);


ALTER TABLE public.applications OWNER TO freerad2_special;
