--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.book_id_seq OWNER TO freerad2_special;

--
-- Name: books; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.books (
    id integer DEFAULT nextval('public.book_id_seq'::regclass) NOT NULL,
    name text,
    url text,
    description text,
    sort text,
    status text,
    img_url text
);


ALTER TABLE public.books OWNER TO freerad2_special;
