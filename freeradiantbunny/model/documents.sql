--
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.document_id_seq OWNER TO freerad2_special;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.documents (
    id integer DEFAULT nextval('public.document_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    domain_tli text,
    url text
);


ALTER TABLE public.documents OWNER TO freerad2_special;
