CREATE SEQUENCE public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;

ALTER TABLE public.transaction_id_seq OWNER TO freerad2_special;

CREATE TABLE public.transactions (
    id integer DEFAULT nextval('public.transaction_id_seq'::regclass) NOT NULL,
    "timestamp" text,
    broker_debit text,
    unit_debit text,
    amount_debit text,
    price text,
    broker_credit text,
    unit_credit text,
    amount_credit text,
    tx_id text,
    trade_id integer,
    date text
);

ALTER TABLE public.transactions OWNER TO freerad2_special;
