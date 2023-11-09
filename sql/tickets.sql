CREATE SEQUENCE public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.tickets_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tickets (
    id integer DEFAULT nextval('public.tickets_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    message_in text,
    response_out text
);

ALTER TABLE public.tickets OWNER TO freerad2_special;

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pk PRIMARY KEY (id);
