--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.account_id_seq OWNER TO freerad2_special;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.accounts (
    id integer DEFAULT nextval('public.account_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    class_name_string text,
    sort text,
    status text,
    img_url text,
    database_string text,
    class_primary_key_string text,
    state text,
    publish text,
    ledger_type text
);


ALTER TABLE public.accounts OWNER TO freerad2_special;