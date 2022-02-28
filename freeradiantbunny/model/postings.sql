CREATE SEQUENCE public.posting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.posting_id_seq OWNER TO freerad2_special;

CREATE TABLE public.postings (
    id integer DEFAULT nextval('public.posting_id_seq'::regclass) NOT NULL,
    account_id integer,
    journal_id integer,
    asset_type_id integer,
    amount text,
    budget_id integer,
    sort text,
    description text,
    status text,
    transaction_date text,
    transfer_account_id integer,
    supplier_id integer,
    due_date text,
    name text,
    img_url text
);


ALTER TABLE public.postings OWNER TO freerad2_special;
