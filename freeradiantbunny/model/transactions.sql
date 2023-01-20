CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.transactions_id_seq OWNER TO freerad2_special;

CREATE TABLE public.transactions (
    id integer DEFAULT nextval('public.transactions_id_seq'::regclass) NOT NULL,
    trade_tickets_id integer,
    assoc_transactions_id integer,
    date text,
    broker_debit text,
    unit_debit text,
    amount_debit text,
    broker_credit text,
    unit_credit text,
    amount_credit text,
    audit text,
    tnx_ref text
);

ALTER TABLE public.transactions OWNER TO freerad2_special;

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_trade_tickets_id_fk FOREIGN KEY (trade_tickets_id) REFERENCES public.trade_tickets(id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_assoc_transactions_id_fk FOREIGN KEY (assoc_transactions_id) REFERENCES public.transactions(id);
