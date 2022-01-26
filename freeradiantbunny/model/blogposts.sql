--
-- Name: blogpost_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.blogpost_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.blogpost_id_seq OWNER TO freerad2_special;

--
-- Name: blogposts; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.blogposts (
    id integer DEFAULT nextval('public.blogpost_id_seq'::regclass) NOT NULL,
    name text,
    body text,
    img_url text,
    tags text,
    url_alias text,
    author text,
    pubdate text,
    webpage_id integer,
    database_string text,
    class_name_string text,
    class_primary_key_string text,
    description text,
    status text,
    sort text
);


ALTER TABLE public.blogposts OWNER TO freerad2_special;
