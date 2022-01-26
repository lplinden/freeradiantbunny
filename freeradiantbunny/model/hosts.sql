--
-- Name: hosts; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.hosts (
    parent_class_name_string text NOT NULL,
    parent_class_primary_key_string text NOT NULL,
    child_class_name_string text NOT NULL,
    child_class_primary_key_string text NOT NULL,
    id integer
);


ALTER TABLE public.hosts OWNER TO freerad2_special;
