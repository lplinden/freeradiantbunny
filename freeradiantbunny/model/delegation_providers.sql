CREATE SEQUENCE public.delegation_providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.delegation_providers_id_seq OWNER TO freerad2_special;

CREATE TABLE public.delegation_providers (
    id integer DEFAULT nextval('public.delegation_providers_id_seq'::regclass) NOT NULL,
    delegations_id integer,
    providers_id integer,
    bips text,
    call_date text,
    tx_hash text,
    tx_fee text
);

ALTER TABLE public.delegation_providers OWNER TO freerad2_special;

ALTER TABLE ONLY public.delegation_providers
    ADD CONSTRAINT delegation_providers_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.delegation_providers
    ADD CONSTRAINT delegation_providers_delegations_id_fk FOREIGN KEY (delegations_id) REFERENCES public.delegations(id);

ALTER TABLE ONLY public.delegation_providers
    ADD CONSTRAINT delegation_providers_providers_id_fk FOREIGN KEY (providers_id) REFERENCES public.providers(id);
