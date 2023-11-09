CREATE SEQUENCE public.machines_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.machines_id_seq OWNER TO freerad2_special;

CREATE TABLE public.machines (
    id integer DEFAULT nextval('public.machines_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    username text,
    filesystems text,
    cpu text,
    ip_address text,
    location text,
    ram text,
    model text,
    backups text,
    log text,
    os text,
    details text,
    networks text,
    output_info text,
    ssl_certificate character varying(1)
);

ALTER TABLE public.machines OWNER TO freerad2_special;

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pk PRIMARY KEY (id);
