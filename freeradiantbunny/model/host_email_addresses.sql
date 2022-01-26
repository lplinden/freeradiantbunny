--
-- Name: host_email_addresses; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.host_email_addresses (
    domain_tli character varying(3) NOT NULL,
    email_address_id integer NOT NULL,
    id integer
);


ALTER TABLE public.host_email_addresses OWNER TO freerad2_special;
