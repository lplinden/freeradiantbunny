--
-- Name: application_databases; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.application_databases (
    id integer NOT NULL,
    application_id integer,
    database_id integer
);


ALTER TABLE public.application_databases OWNER TO freerad2_special;
