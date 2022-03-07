CREATE SEQUENCE public.scene_element_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.scene_element_id_seq OWNER TO freerad2_special;

CREATE TABLE public.scene_elements (
    id integer DEFAULT nextval('public.scene_element_id_seq'::regclass) NOT NULL,
    process_id integer,
    sort text,
    database_string text,
    class_name_string text,
    class_primary_key_string text,
    description text,
    yield text,
    status text,
    img_url text,
    name text,
    publish text,
    account_id integer
);


ALTER TABLE public.scene_elements OWNER TO freerad2_special;

ALTER TABLE ONLY public.scene_elements
    ADD CONSTRAINT scene_element_id_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.scene_elements
    ADD CONSTRAINT scene_elements_process_id_fkey FOREIGN KEY (process_id) REFERENCES public.processes(id);

CREATE INDEX scene_elements_index_id ON public.scene_elemnts USING btree (id);
