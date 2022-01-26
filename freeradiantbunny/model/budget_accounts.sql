--
-- Name: budget_accounts; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.budget_accounts (
    budget_id integer NOT NULL,
    account_id integer NOT NULL,
    id integer
);


ALTER TABLE public.budget_accounts OWNER TO freerad2_special;
