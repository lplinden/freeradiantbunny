--
-- Name: email_address_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.email_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.email_address_id_seq OWNER TO freerad2_special;

--
-- Name: email_addresses; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.email_addresses (
    id integer NOT NULL,
    name text,
    sort text,
    status text,
    img_url text,
    description text
);


ALTER TABLE public.email_addresses OWNER TO freerad2_special;
