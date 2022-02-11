CREATE SEQUENCE public.indiegoal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.indiegoal_id_seq OWNED BY freerad2_special;

CREATE TABLE public.indiegoals (
    id integer DEFAULT nextval('public.indiegoal_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    date_string text,
    reading text,
    yawp_agent_type text,
    sort text,
    status text,
    img_url text,
    url text
);


ALTER TABLE public.indiegoals OWNER TO freerad2_special;

ALTER TABLE ONLY public.indiegoals
    ADD CONSTRAINT indiegoal_id_pkey PRIMARY KEY (id);

