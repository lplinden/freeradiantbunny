CREATE SEQUENCE public.songs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.songs_id_seq OWNER TO freerad2_special;

CREATE TABLE public.songs (
    id integer DEFAULT nextval('public.songs_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    albums_id integer,
    lyrics_url text,
    mp3_url text,
    album_sort text,
    chords text,
    alphabetical text,
    url text
);

ALTER TABLE public.songs OWNER TO freerad2_special;

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_album_id_fk FOREIGN KEY (album_id) REFERENCES public.albums(id);
