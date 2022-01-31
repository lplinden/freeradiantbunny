--
-- Name: process_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.process_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.process_id_seq OWNER TO freerad2_special;

--
-- Name: processes; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.processes (
    id integer DEFAULT nextval('public.process_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    business_plan_text_id integer NOT NULL,
    status text,
    priority text,
    img_url text,
    time_rules text,
    responsibility text,
    yield text,
    publish text
);


ALTER TABLE public.processes OWNER TO freerad2_special;

--
-- Name: processes processes_pkey; Type: CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT process_id_pkey PRIMARY KEY (id);

--
-- Name: processes processes_business_plan_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.processes
    ADD CONSTRAINT processes_business_plan_text_id_fkey FOREIGN KEY (business_plan_text_id) REFERENCES public.business_plan_texts(id);

--
-- Name: processes_index_id; Type: INDEX; Schema: public; Owner: freerad2_special
--

CREATE INDEX processes_index_id ON public.processes USING btree (id);
