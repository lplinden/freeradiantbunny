CREATE SEQUENCE public.filenames_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.filenames_id_seq OWNER TO freerad2_special;

CREATE TABLE public.filenames (
    id integer DEFAULT nextval('public.filenames_id_seq'::regclass) NOT NULL,
    datastore_id integer,
    path text,
    name text,
    extension text,
    fullpath_filename text,
    md5sum text,
    size integer,
    monetize text
);

ALTER TABLE public.filenames OWNER TO freerad2_special;

ALTER TABLE ONLY public.filenames
    ADD CONSTRAINT filenames_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.filenames
    ADD CONSTRAINT filenames_datastore_id_fk FOREIGN KEY (datastore_id) REFERENCES public.datastores(id);
