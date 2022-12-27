CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.transactions_id_seq OWNER TO freerad2_special;

CREATE TABLE public.transactions (
    id integer DEFAULT nextval('public.transactions_id_seq'::regclass) NOT NULL,
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
    ADD CONSTRAINT transactions_trade_ticket_id_fk FOREIGN KEY trade_tickets (id);

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_associated_tnx_id_fk FOREIGN KEY transactions (id);
