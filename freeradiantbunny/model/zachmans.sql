--
-- Name: zachmans; Type: TABLE; Schema: public; Owner: freerad2_special
--

CREATE TABLE public.zachmans (
    id integer NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text
);


ALTER TABLE public.zachmans OWNER TO freerad2_special;

--
-- Name: zachmans zachmans_pkey; Type: CONSTRAINT; Schema: public; Owner: freerad2_special
--
ALTER TABLE ONLY public.zachmans
    ADD CONSTRAINT zachmans_pkey PRIMARY KEY (id);
