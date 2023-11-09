CREATE SEQUENCE public.stake_providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.stake_providers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stake_providers (
    id integer DEFAULT nextval('public.stake_providers_id_seq'::regclass) NOT NULL,
    stakes_id integer,
    providers_id integer,
    name text
);

ALTER TABLE public.stake_providers OWNER TO freerad2_special;

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_stakes_id_fk FOREIGN KEY (stakes_id) REFERENCES public.stakes(id);

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_providers_id_fk FOREIGN KEY (providers_id) REFERENCES public.providers(id);
