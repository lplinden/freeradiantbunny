CREATE SEQUENCE public.budget_plants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.budget_plants_id_seq OWNER TO freerad2_special;

CREATE TABLE public.budget_plants (
    id integer DEFAULT nextval('public.budget_plants_id_seq'::regclass) NOT NULL,
    account_id integer,
    status text,
    due_date text,
    amount text,
    reference text
);

ALTER TABLE public.budget_plants OWNER TO freerad2_special;

ALTER TABLE ONLY public.budget_plants
    ADD CONSTRAINT budget_plants_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.budget_plants
    ADD CONSTRAINT budget_plants_account_id_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id);
