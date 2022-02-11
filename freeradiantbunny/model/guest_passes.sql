CREATE SEQUENCE public.guest_pass_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.guest_pass_id_seq OWNER TO freerad2_special;

CREATE TABLE public.guest_passes (
    id integer DEFAULT nextval('public.guest_pass_id_seq'::regclass) NOT NULL,
    owner_name text,
    url text,
    guest_name text
);


ALTER TABLE public.guest_passes OWNER TO freerad2_special;

ALTER TABLE ONLY public.guest_passes
    ADD CONSTRAINT guest_pass_id_pkey PRIMARY KEY (id);
