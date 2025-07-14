CREATE SEQUENCE public.postings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.postings_id_seq OWNER TO freerad2_special;

CREATE TABLE public.postings (
    id integer DEFAULT nextval('public.postings_id_seq'::regclass) NOT NULL,
    name text NOT NULL,
    description text,
    img_url text,
    status text,
    sort text,
    accounts_id integer,
    journals_id integer,
    asset_types_id integer,
    amount text,
    budgets_id integer,
    transaction_date text,
    transfer_accounts_id integer,
    suppliers_id integer,
    due_date text
);

ALTER TABLE public.postings OWNER TO freerad2_special;

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_accounts_id_fk FOREIGN KEY (accounts_id) REFERENCES public.accounts(id);

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_journals_id_fk FOREIGN KEY (journals_id) REFERENCES public.journals(id);

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_budgets_id_fk FOREIGN KEY (budgets_id) REFERENCES public.budgets(id);

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_suppliers_id_fk FOREIGN KEY (suppliers_id) REFERENCES public.suppliers(id);

