--
-- Name: business_plan_text_id_seq; Type: SEQUENCE; Schema: public; Owner: freerad2_special
--

CREATE SEQUENCE public.business_plan_text_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.business_plan_text_id_seq OWNER TO freerad2_special;

--
-- Name: business_plan_texts; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.business_plan_texts (
    id integer DEFAULT nextval('public.business_plan_text_id_seq'::regclass) NOT NULL,
    description text,
    name text,
    sort text,
    status text,
    img_url text,
    goal_statement_id integer NOT NULL,
    publish text
);


ALTER TABLE public.business_plan_texts OWNER TO freerad2_special;

--
-- Name: business_plan_texts business_plan_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.business_plan_texts
    ADD CONSTRAINT business_plan_text_id_pkey PRIMARY KEY (id);

--
-- Name: business_plan_texts business_plan_texts_goal_statement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freerad2_special
--

ALTER TABLE ONLY public.business_plan_texts
    ADD CONSTRAINT business_plan_texts_goal_statement_id_fkey FOREIGN KEY (goal_statement_id) REFERENCES public.goal_statements(id);

