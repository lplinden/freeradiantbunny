CREATE SEQUENCE public.book_clips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.book_clips_id_seq OWNER TO freerad2_special;

CREATE TABLE public.book_clips (
    id integer DEFAULT nextval('public.book_clips_id_seq'::regclass) NOT NULL,
    image_id integer,
    plant_id integer,
    book_id integer,
    excerpt text,
    see_also text
);

ALTER TABLE public.book_clips OWNER TO freerad2_special;

ALTER TABLE ONLY public.book_clips
    ADD CONSTRAINT book_clips_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.book_clips
    ADD CONSTRAINT book_clips_image_id_fk FOREIGN KEY (image_id) REFERENCES public.images(id);

ALTER TABLE ONLY public.book_clips
    ADD CONSTRAINT book_clips_book_id_fk FOREIGN KEY (book_id) REFERENCES public.books(id);

ALTER TABLE ONLY public.book_clips
    ADD CONSTRAINT book_clips_plant_id_fk FOREIGN KEY (plant_id) REFERENCES public.plants(id);
