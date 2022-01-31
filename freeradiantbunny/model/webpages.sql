--
-- Name: webpage_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.webpage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;


ALTER TABLE public.webpage_id_seq OWNER TO freerad2_special;

--
-- Name: webpages; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.webpages (
    id integer DEFAULT nextval('public.webpage_id_seq'::regclass) NOT NULL,
    domain_tli character varying(3) NOT NULL,
    description text,
    name text,
    sort text,
    img_url text,
    status text,
    path text
);


ALTER TABLE public.webpages OWNER TO freerad2_special;

--
-- Name: webpages webpages_id_pk; Type: CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_id_pk PRIMARY KEY (id);

--
-- Name: webpages webpage_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.webpages
    ADD CONSTRAINT webpages_domain_id_fkey FOREIGN KEY (domain_tli) REFERENCES public.domains(tli);
