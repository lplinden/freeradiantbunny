CREATE SEQUENCE public.boxes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.boxes_id_seq OWNER TO freerad2_special;

CREATE TABLE public.boxes (
    id integer DEFAULT nextval('public.boxes_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    stack_name text
);

ALTER TABLE public.boxes OWNER TO freerad2_special;

ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT boxes_pk PRIMARY KEY (id);
