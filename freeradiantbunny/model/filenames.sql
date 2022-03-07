CREATE TABLE public.filenames (
    id integer NOT NULL,
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
    ADD CONSTRAINT filename_id_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.filenames
    ADD CONSTRAINT filenames_datastore_id_fkey FOREIGN KEY (datastore_id) REFERENCES public.datastores(id);
