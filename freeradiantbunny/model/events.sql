--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO freerad2_special;

--
-- Name: events; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.events (
    id integer DEFAULT nextval('public.event_id_seq'::regclass) NOT NULL,
    time_start timestamp with time zone DEFAULT '2014-04-01 08:00:00+00'::timestamp with time zone,
    time_finish timestamp with time zone DEFAULT '2014-04-01 07:00:00+00'::timestamp with time zone,
    name text
);


ALTER TABLE public.events OWNER TO freerad2_special;
