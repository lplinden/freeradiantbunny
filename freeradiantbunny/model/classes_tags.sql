--
-- Name: classes_tags; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.classes_tags (
    id integer NOT NULL,
    class_name text,
    id_of_given_class integer,
    tag_id integer
);


ALTER TABLE public.classes_tags OWNER TO freerad2_special;
