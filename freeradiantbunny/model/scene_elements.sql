CREATE SEQUENCE public.scene_elements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.scene_elements_id_seq OWNER TO freerad2_special;

CREATE TABLE public.scene_elements (
    id integer DEFAULT nextval('public.scene_elements_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    process_id integer,
    account_id integer,
    database_string text,
    class_name_string text,
    class_primary_key_string text,
    yield text,
    publish text
);

ALTER TABLE public.scene_elements OWNER TO freerad2_special;

ALTER TABLE ONLY public.scene_elements
    ADD CONSTRAINT scene_elements_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.scene_elements
    ADD CONSTRAINT scene_elements_process_id_fk FOREIGN KEY (process_id) REFERENCES public.processes(id);

ALTER TABLE ONLY public.scene_elements
    ADD CONSTRAINT scene_elements_account_id_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id);

CREATE INDEX scene_elements_index_id ON public.scene_elements USING btree (id);
