CREATE SEQUENCE public.shares_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.shares_id_seq OWNER TO freerad2_special;

CREATE TABLE public.shares (
    id integer DEFAULT nextval('public.shares_id_seq'::regclass) NOT NULL,
    harvest_id integer,
    owner text,
    price text
);

ALTER TABLE public.shares OWNER TO freerad2_special;

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.shares
    ADD CONSTRAINT shares_harvest_id_fk FOREIGN KEY (harvest_id) REFERENCES public.harvests(id);
