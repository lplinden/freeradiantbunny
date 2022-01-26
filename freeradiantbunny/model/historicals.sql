--
-- Name: historicals; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.historicals (
    id integer NOT NULL,
    exchange text,
    symbol_to text,
    symbol_from text,
    ts text,
    close_price text,
    high_price text,
    low_price text,
    open_price text,
    volume_from text,
    volume_to text,
    datafeed text
);


ALTER TABLE public.historicals OWNER TO freerad2_special;
