--
-- Name: documentation_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.documentation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.documentation_id_seq OWNER TO freerad2_special;

--
-- Name: documentations; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.documentations (
    id integer DEFAULT nextval('public.documentation_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    user_name text,
    categorization text,
    table_name text,
    img_url text,
    how_to_measure text
);


ALTER TABLE public.documentations OWNER TO freerad2_special;

