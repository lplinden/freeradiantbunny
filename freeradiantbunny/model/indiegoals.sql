CREATE SEQUENCE public.indiegoals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.indiegoals_id_seq OWNER TO freerad2_special;

CREATE TABLE public.indiegoals (
    id integer DEFAULT nextval('public.indiegoals_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    date_string text,
    reading text,
    yawp_agent_type text,
    url text
);

ALTER TABLE public.indiegoals OWNER TO freerad2_special;

ALTER TABLE ONLY public.indiegoals
    ADD CONSTRAINT indiegoals_pk PRIMARY KEY (id);
