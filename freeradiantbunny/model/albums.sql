CREATE SEQUENCE public.album_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.album_id_seq OWNER TO freerad2_special;

CREATE TABLE public.albums (
    id integer DEFAULT nextval('public.album_id_seq'::regclass) NOT NULL,
    name text,
    year character varying(4),
    cover_front_url text,
    cover_back_url text,
    notes text,
    album_url text,
    description text,
    sort text,
    status text,
    img_url text
);


ALTER TABLE public.albums OWNER TO freerad2_special;

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_id_pkey PRIMARY KEY (id);
    
