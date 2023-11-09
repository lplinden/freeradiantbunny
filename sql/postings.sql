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
    account_id integer,
    journal_id integer,
    asset_type_id integer,
    amount text,
    budget_id integer,
    transaction_date text,
    transfer_account_id integer,
    supplier_id integer,
    due_date text
);

ALTER TABLE public.postings OWNER TO freerad2_special;

ALTER TABLE ONLY public.postings
    ADD CONSTRAINT postings_pk PRIMARY KEY (id);
