CREATE SEQUENCE public.plan_id_seq
    START WITH 15
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.plan_id_seq OWNER TO freerad2_special;

CREATE TABLE public.plans (
    id integer DEFAULT nextval('public.plan_id_seq'::regclass) NOT NULL,
    status text,
    account_id integer,
    due_date text,
    amount text,
    reference text,
    status text
);

ALTER TABLE public.plans OWNER TO freerad2_special;

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plan_id_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(id);
