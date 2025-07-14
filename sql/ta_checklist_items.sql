CREATE SEQUENCE public.ta_checklist_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.ta_checklist_items_id_seq OWNER TO freerad2_special;

CREATE TABLE public.ta_checklist_items (
    id integer DEFAULT nextval('public.ta_checklist_items_id_seq'::regclass) NOT NULL,
    name text,
    sort text,
    coins_id integer,
    trigger_price numeric(20,10),
    trading_strategies_id integer,
    overall_assessment text,
    notes text        
);

ALTER TABLE public.ta_checklist_items OWNER TO freerad2_special;

ALTER TABLE ONLY public.ta_checklist_items
    ADD CONSTRAINT ta_checklist_items_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.ta_checklist_items
    ADD CONSTRAINT checklist_items_trading_strategies_id_fk FOREIGN KEY (trading_strategies_id) REFERENCES public.trading_strategies(id);
    
