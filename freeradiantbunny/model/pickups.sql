CREATE SEQUENCE public.pickups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999
    CACHE 1;

ALTER SEQUENCE public.pickups_id_seq OWNER TO freerad2_special;

CREATE TABLE public.pickups (
    id integer DEFAULT nextval('public.pickups_id_seq'::regclass) NOT NULL,
    pickup_detail_id integer,
    invoice_line_id integer,
    delivery_stop_flag text
);

ALTER TABLE public.pickups OWNER TO freerad2_special;

ALTER TABLE ONLY public.pickups
    ADD CONSTRAINT pickups_pk PRIMARY KEY (id);

ALTER TABLE ONLY public.pickups
    ADD CONSTRAINT pickups_pickup_detail_id_fk FOREIGN KEY (pickup_detail_id) REFERENCES public.pickup_details(id);

ALTER TABLE ONLY public.pickups
    ADD CONSTRAINT pickups_invoice_line_id_fk FOREIGN KEY (invoice_line_id) REFERENCES public.invoice_lines(id);
