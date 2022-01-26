--
-- Name: beds; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.beds (
    id integer NOT NULL,
    name text NOT NULL,
    land_id integer NOT NULL,
    sort text,
    img_url text,
    description text,
    status text
);


ALTER TABLE public.beds OWNER TO freerad2_special;
