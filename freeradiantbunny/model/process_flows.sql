CREATE SEQUENCE public.process_flow_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.process_flow_id_seq OWNER TO freerad2_special;

CREATE TABLE public.process_flows (
    id integer DEFAULT nextval('public.process_flow_id_seq'::regclass) NOT NULL,
    name text,	
    description text,
    sort text,
    status text,
    img_url text,
    parent_process_id integer NOT NULL,
    child_process_id integer NOT NULL,	
    publish text
);


ALTER TABLE public.process_flows OWNER TO freerad2_special;

ALTER TABLE ONLY public.process_flows
    ADD CONSTRAINT process_flow_id_pkey PRIMARY KEY (id);
    
