
--
-- Name: machine_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.machine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 29;


ALTER TABLE public.machine_id_seq OWNER TO freerad2_special;

--
-- Name: machines; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.machines (
    id integer DEFAULT nextval('public.machine_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    cpu text,
    filesystems text,
    sort text,
    status text,
    user_name text,
    ip_address text,
    img_url text,
    location text,
    ram text,
    model text,
    os text,
    details text,
    networks text,
    backups text,
    output_info text
);


ALTER TABLE public.machines OWNER TO freerad2_special;
