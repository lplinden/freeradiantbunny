--
-- Name: application_email_addresses; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.application_email_addresses (
    id integer NOT NULL,
    application_id integer,
    email_address_id integer
);


ALTER TABLE public.application_email_addresses OWNER TO freerad2_special;
