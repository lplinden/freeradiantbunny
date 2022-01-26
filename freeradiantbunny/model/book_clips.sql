--
-- Name: book_clip_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.book_clip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.book_clip_id_seq OWNER TO freerad2_special;

--
-- Name: book_clips; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.book_clips (
    id integer DEFAULT nextval('public.book_clip_id_seq'::regclass) NOT NULL,
    image_id integer,
    plant_id integer,
    excerpt text,
    see_also text,
    book_id integer
);


ALTER TABLE public.book_clips OWNER TO freerad2_special;
