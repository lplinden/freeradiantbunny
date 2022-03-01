CREATE SEQUENCE public.ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.ticket_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tickets (
    id integer DEFAULT nextval('public.ticket_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    status text DEFAULT 'open'::text,
    process_id integer NOT NULL,
    description text,
    img_url text,
    action_to_take text
);

ALTER TABLE public.tickets OWNER TO freerad2_special;
