--
-- Name: domain_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.domain_id_seq
    START WITH 9
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domain_id_seq OWNER TO freerad2_special;

--
-- Name: domains; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.domains (
    tli character varying(3) NOT NULL,
    domain_name character varying(100) NOT NULL,
    tagline text,
    img_url text,
    sort character varying(12),
    registrar text,
    hosting text,
    status text,
    crm text,
    name text,
    user_name text,
    backups text,
    log text,
    design_id integer,
    description text,
    id integer DEFAULT nextval('public.domain_id_seq'::regclass) NOT NULL,
    ssl_cert character(1),
    inquiring_system text
);


ALTER TABLE public.domains OWNER TO freerad2_special;