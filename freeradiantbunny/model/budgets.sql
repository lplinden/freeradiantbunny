--
-- Name: budget_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.budget_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.budget_id_seq OWNER TO freerad2_special;

--
-- Name: budgets; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.budgets (
    id integer DEFAULT nextval('public.budget_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    publish text,
    process_state text
);

ALTER TABLE public.budgets OWNER TO freerad2_special;
