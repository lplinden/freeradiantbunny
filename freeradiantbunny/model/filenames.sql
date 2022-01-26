--
-- Name: filenames; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.filenames (
    path text,
    name text,
    extension text,
    fullpath_filename text,
    md5sum text,
    size integer,
    monetize text,
    id integer
);


ALTER TABLE public.filenames OWNER TO freerad2_special;
