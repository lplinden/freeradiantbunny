CREATE SEQUENCE public.albums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.albums_id_seq OWNER TO freerad2_special;

CREATE TABLE public.albums (
    id integer DEFAULT nextval('public.albums_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    year character varying(4),
    cover_front_url text,
    cover_back_url text,
    notes text,
    album_url text
);

ALTER TABLE public.albums OWNER TO freerad2_special;

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pk PRIMARY KEY (id);
