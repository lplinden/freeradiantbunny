CREATE SEQUENCE public.stake_providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.stake_providers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.stake_providers (
    id integer DEFAULT nextval('public.stake_providers_id_seq'::regclass) NOT NULL,
    name text,
    stake_id integer,
    provider_id integer,
);

ALTER TABLE public.stake_providers OWNER TO freerad2_special;

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_stake_id_fk FOREIGN KEY (stake_id) REFERENCES public.stakes(id);

ALTER TABLE ONLY public.stake_providers
    ADD CONSTRAINT stake_providers_provider_id_fk FOREIGN KEY (provider_id) REFERENCES public.providers(id);
