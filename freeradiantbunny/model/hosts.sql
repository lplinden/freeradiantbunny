CREATE SEQUENCE public.hosts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.host_id_seq OWNER TO freerad2_special;

CREATE TABLE public.hosts (
    id integer DEFAULT nextval('public.hosts_id_seq'::regclass) NOT NULL,
    parent_class_name_string text NOT NULL,
    parent_class_primary_key_string text NOT NULL,
    child_class_name_string text NOT NULL,
    child_class_primary_key_string text NOT NULL
);

ALTER TABLE public.hosts OWNER TO freerad2_special;

ALTER TABLE ONLY public.hosts
    ADD CONSTRAINT hosts_pk PRIMARY KEY (id);
