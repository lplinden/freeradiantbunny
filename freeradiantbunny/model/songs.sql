CREATE SEQUENCE public.song_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.song_id_seq OWNER TO freerad2_special;

CREATE TABLE public.songs (
    id integer DEFAULT nextval('public.song_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    lyrics_url text,
    mp3_url text,
    album_id integer,
    album_sort text,
    chords text,
    alphabetical text,
    status text,
    img_url text,
    url text,
    description text
);

ALTER TABLE public.songs OWNER TO freerad2_special;
