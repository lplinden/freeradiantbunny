--
-- Name: color_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.color_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.color_id_seq OWNER TO freerad2_special;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.colors (
    id integer DEFAULT nextval('public.color_id_seq'::regclass) NOT NULL,
    tla character varying(3),
    name text,
    url text,
    hex_code text,
    full_name text
);


ALTER TABLE public.colors OWNER TO freerad2_special;
