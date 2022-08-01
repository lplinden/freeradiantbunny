CREATE SEQUENCE public.account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER TABLE public.account_id_seq OWNER TO freerad2_special;

CREATE TABLE public.accounts (
    id integer DEFAULT nextval('public.account_id_seq'::regclass) NOT NULL,
    name text,
    description text,
    sort text,
    status text,
    img_url text,
    audit_state text,
    publish text,
    ledger_type text,
    flow text
);

ALTER TABLE public.accounts OWNER TO freerad2_special;

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT account_id_pkey PRIMARY KEY (id);

