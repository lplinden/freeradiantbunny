CREATE SEQUENCE public.beds_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.beds_id_seq OWNER TO freerad2_special;

CREATE TABLE public.beds (
    id integer DEFAULT nextval('public.beds_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    land_id integer
);

ALTER TABLE public.beds OWNER TO freerad2_special;

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT beds_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.beds
    ADD CONSTRAINT beds_land_id_fk FOREIGN KEY (land_id) REFERENCES public.lands(id);
