CREATE TABLE public.courses (
    id integer NOT NULL
);


ALTER TABLE public.courses OWNER TO freerad2_special;

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT course_id_pkey PRIMARY KEY (id);
    
