--
-- Name: hyperlink_permaculture_topics_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.hyperlink_permaculture_topics_id_seq
    START WITH 2
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 2;


ALTER TABLE public.hyperlink_permaculture_topics_id_seq OWNER TO freerad2_special;

--
-- Name: hyperlink_permaculture_topics; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.hyperlink_permaculture_topics (
    hyperlink_id integer NOT NULL,
    permaculture_topic_id integer NOT NULL,
    id integer DEFAULT nextval('public.hyperlink_permaculture_topics_id_seq'::regclass) NOT NULL
);


ALTER TABLE public.hyperlink_permaculture_topics OWNER TO freerad2_special;
