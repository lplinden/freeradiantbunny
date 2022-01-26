--
-- Name: coin_market_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.coin_market_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coin_market_id_seq OWNER TO freerad2_special;

--
-- Name: coin_markets; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.coin_markets (
    id integer DEFAULT nextval('public.coin_market_id_seq'::regclass) NOT NULL,
    coin_id integer,
    market_id integer
);


ALTER TABLE public.coin_markets OWNER TO freerad2_special;
