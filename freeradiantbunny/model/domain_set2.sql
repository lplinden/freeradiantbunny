--
-- Name: domains_set2; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.domains_set2 (
    tli character varying(3) NOT NULL,
    domain_name character varying(100),
    tagline text,
    img_url text,
    sort character varying(12),
    registrar text,
    hosting text,
    status text,
    crm text,
    name text,
    user_name text,
    spotlight text,
    backups text,
    log text,
    design_id text,
    description text,
    ssl_cert text,
    id integer
);


ALTER TABLE public.domains_set2 OWNER TO freerad2_special;
