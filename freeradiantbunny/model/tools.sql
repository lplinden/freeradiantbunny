CREATE SEQUENCE public.tool_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.tool_id_seq OWNER TO freerad2_special;

CREATE TABLE public.tools (
    id integer DEFAULT nextval('public.tool_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    img_url text,
    sort text,
    status text
);

ALTER TABLE public.tools OWNER TO freerad2_special;
