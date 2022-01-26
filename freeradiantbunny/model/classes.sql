--
-- Name: class_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.class_id_seq OWNER TO freerad2_special;

--
-- Name: classes; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.classes (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    notes text,
    zachman_id integer,
    sort text,
    status text,
    img_url text,
    subsystem text,
    dev text,
    codebase text
);


ALTER TABLE public.classes OWNER TO freerad2_special;
