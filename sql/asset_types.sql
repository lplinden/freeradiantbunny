-- version 0.0.5
CREATE SEQUENCE public.asset_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.asset_types_id_seq OWNER TO freerad2_special;

CREATE TABLE public.asset_types (
    id integer DEFAULT nextval('public.asset_types_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    sort text NOT NULL,
    status text NOT NULL,
    img_url text NOT NULL
);

ALTER TABLE public.asset_types OWNER TO freerad2_special;

ALTER TABLE ONLY public.asset_types
    ADD CONSTRAINT asset_types_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.asset_types
    ADD CONSTRAINT asset_types_name_unique UNIQUE (name);

